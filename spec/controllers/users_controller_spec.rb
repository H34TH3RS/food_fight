require 'rails_helper'

RSpec.describe Api::UsersController, type: :controller do
  describe 'POST #create' do
    it 'can create a user' do
      post :create, params: { user: {
        email: 'whatever',
        username: 'whatever',
        password: 'whatever',
        password_confirmation: 'whatever'
      } }
      expect(response).to be_created
      token = JSON.parse(response.body)['auth_token']
      expect(token)
    end
  end
  it 'can reject a new user' do
    post :create, params: { user: {
      email: 'whatever',
      username: 'whatever'
    } }
    expect(response).to have_http_status(:unprocessable_entity)
  end
end
