# frozen_string_literal: true

class Api::CardsController < ApplicationController
  def create
    api_data = NutritionixApi.new.get_nutrition_data(user_params['upc']) # TODO: need to add conditional logic to determine if a new card should be created or an old card should be pulled from memory

    nutrition_data = api_data.slice('item_name', 'nf_calories', 'nf_total_fat', 'nf_total_carbohydrate', 'nf_dietary_fiber', 'nf_sugars', 'nf_protein', 'nf_vitamin_a_dv', 'nf_vitamin_c_dv', 'nf_calcium_dv', 'nf_iron_dv', 'nf_potassium')

    new_card_data = CardConverter.new.convert!(nutrition_data)

    binding.pry
    # @card = Card.new(card_data)
    # @card.save
  end

  private def user_params
    params.permit(:upc) # TODO: need to add validations
  end
end
