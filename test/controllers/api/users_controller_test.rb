# frozen_string_literal: true

require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test 'can create a user' do
    post "/api/users", params: { user: {
      email: 'whatever',
      username: 'whatever',
      password: 'whatever',
      password_confirmation: 'whatever'
    } }
    assert response.created?
    token = JSON.parse(response.body)['auth_token']
    assert token
  end
end
