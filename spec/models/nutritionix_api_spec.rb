# frozen_string_literal: true

require 'rails_helper'

RSpec.describe NutritionixApi, type: :model do
  it 'fetches api data by upc' do
    stub_request(:get, %r{api.nutritionix.com/v1_1/item})
      .with(query: hash_including(upc: '52200004265'))
      .to_return(
        status: 200,
        body: File.read(NUTRITIONIX_STUB_PATH),
        headers: {
          'Content-Type' => 'application/json; charset=utf-8'
        }
      )
    nutrition_data = NutritionixApi.new.get_nutrition_data('52200004265')

    expect(nutrition_data['nf_calories']).to eq 60
  end
end
