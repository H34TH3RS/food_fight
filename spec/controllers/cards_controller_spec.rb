# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do
  NUTRITIONIX_STUB_PATH =  \
    'spec/fixtures/files/stub_requests/get_nutrition_data.json'

  BAD_NUTRITIONIX_UPC_PATH = \
    'spec/fixtures/files/stub_requests/bad_upc_response.json'

  describe 'POST #create' do
    it 'can create a player card' do
      stub_request(:get, %r{api.nutritionix.com/v1_1/item})
        .with(query: hash_including(upc: '52200004265'))
        .to_return(
          status: 200,
          body: File.read(NUTRITIONIX_STUB_PATH),
          headers: {
            'Content-Type' => 'application/json; charset=utf-8'
          }
        )
      current_user = users(:russell)
      request.headers['HTTP_AUTHORIZATION'] = "token #{current_user.auth_token}"
      post :create,
           params: { upc: '52200004265' }

      expect(response).to be_created

      expect(JSON.parse(response.body)["food_name"]).to_not eq(nil)
    end
  end
  describe 'POST #create' do
    it 'prevents users from submitting upcs without logging in' do
      post :create,
           params: { upc: '52200004265' }
      expect(response).to be_unauthorized
    end
  end
  describe 'POST #create' do
    it 'can retrieve existing card data without connecting to api' do
      current_user = users(:russell)
      request.headers['HTTP_AUTHORIZATION'] = "token #{current_user.auth_token}"
      post :create,
           params: { upc: '123456789123' }
      expect(JSON.parse(response.body)['klass']).to eq('Coke')
    end
  end
  describe 'POST #create' do
    it 'can reject bad upc data and respond with error message' do
      stub_request(:get, %r{api.nutritionix.com/v1_1/item})
        .with(query: hash_including(upc: '0'))
        .to_return(
          status: 404,
          body: File.read(BAD_NUTRITIONIX_UPC_PATH),
          headers: {
            'Content-Type' => 'application/json; charset=utf-8'
          }
        )

      current_user = users(:russell)
      request.headers['HTTP_AUTHORIZATION'] = "token #{current_user.auth_token}"
      post :create,
           params: { upc: 0 }
      expect(response).to have_http_status(:unprocessable_entity)
      expect(JSON.parse(response.body)).to eq('messages' => 'Invalid UPC')
    end
  end
end
