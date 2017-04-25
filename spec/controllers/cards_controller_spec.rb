# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::CardsController, type: :controller do
  describe 'POST #create' do
    it 'can create a player card' do
      post :create, params: {
        upc: '49000036756'
      }
      expect(response).to be_created
      expect(response).to include("energy": 100)
    end
  end
end
