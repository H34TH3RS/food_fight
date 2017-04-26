require 'rails_helper'

RSpec.describe Api::AuthorizationsController, type: :controller do
  describe 'POST #create' do
    it 'can reject an authorization' do
      post :create, params: {
        email: 'whatever',
        password: 'whatever'
      }

      expect(response).to be_unauthorized
    end
    it 'can authorize a user' do
      post :create, params: {
        email: 'moose@tiydc.com',
        password: 'password'
      }
      expect(response).to be_ok
      token = JSON.parse(response.body)['auth_token']
      expect(token).to match(/[0-f]{32}/)
    end
    it 'can log out a user' do
      current_user = users(:russell)
      token = current_user.auth_token
      request.headers["HTTP_AUTHORIZATION"]= "token #{token}"
      delete :destroy
      current_user.reload
      new_token = current_user.auth_token
      expect(token).not_to equal(new_token)
    end
  end
end
