# frozen_string_literal: true

class Api::CardsController < ApplicationController
  def create
    upc = user_params['upc']
    card = Card.find_by(upc: upc)
    @card = if card
              card
            else
              Card.new(build_card_from_api)
            end

    if @card.save
      current_user.cards << @card
      # TODO: except keys you don't need in json output
      render json: @card.as_json(except: %i[created_at upc nutrition_data]),
             status: :created
    else
      render json: { message: error.to_s },
             status: :unprocessable_entity
    end
  end

  private def user_params
    params.permit(:upc) # TODO: need to add validations
  end

  def build_card_from_api
    api_data = NutritionixApi.new.get_nutrition_data(user_params['upc'])

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
      'nf_potassium',
      'nf_sodium'
    )

    basic_card_data = CardConverter.new.convert!(nutrition_data)
    added_data = {
      upc: user_params['upc'],
      nutrition_data: nutrition_data.as_json
    }
    basic_card_data.merge(added_data)
  end
end
