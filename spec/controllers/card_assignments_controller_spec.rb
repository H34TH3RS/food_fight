# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CardAssignmentsController, type: :controller do
  describe 'GET #index' do
    it "can list all of a player's cards" do
      current_user = users(:russell)
      request.headers['HTTP_AUTHORIZATION'] = "token #{current_user.auth_token}"
      get :index
      expect(response).to be_success
      expect(JSON.parse(response.body)).to eq([])
    end
  end
end
