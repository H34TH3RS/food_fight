# frozen_string_literal: true

class Api::CardsController < ApplicationController
  def create
    api_data = NutritionixApi.new.get_nutrition_data(user_params['upc'])
    # TODO: need to add conditional logic to determine if a new card should be created or an old card should be pulled from memory

    nutrition_data = api_data.slice(
      'item_name',
      'nf_calories',
      'nf_total_fat',
      'nf_total_carbohydrate',
      'nf_dietary_fiber',
      'nf_sugars',
      'nf_protein',
      'nf_vitamin_a_dv',
      'nf_vitamin_c_dv',
      'nf_calcium_dv',
      'nf_iron_dv',
      'nf_potassium'
    )

    @basic_card_data = CardConverter.new.convert!(nutrition_data)
    added_data = {
      upc: user_params['upc'],
      nutrition_data: nutrition_data.as_json
    }
    card_data = @basic_card_data.merge(added_data)

    @card = Card.new(card_data)

    if @card.save
      render json: @basic_card_data.as_json, status: :created
    else
      render json: { message: error.to_s }, status: :unprocessable_entity
    end
  end

  private def user_params
    params.permit(:upc) # TODO: need to add validations
  end
end
