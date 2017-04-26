# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do
  NUTRITIONIX_STUB_PATH =  \
    'spec/fixtures/files/stub_requests/get_nutrition_data.json'

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

      expect(JSON.parse(response.body)).to include('energy')
    end
  end
  describe "POST #create" do
    it "prevents users from submitting upcs without logging in" do
      post :create,
           params: { upc: '52200004265' }
      expect(response).to be_unauthorized
    end
  end
end
