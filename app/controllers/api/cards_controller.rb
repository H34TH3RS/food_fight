# frozen_string_literal: true

class CardsController < ApplicationController
  def create
    NutritionixApi.new.get_nutrition_data(user_params) # TODO: need to add conditional logic to determine if a new card should be created or an old card should be pulled from memory
    # TODO: need to decide if I need nested values for user params.
    @card = Card.new(api_params)
    @card.save
  end

  private def user_params
    params.require(:card).permit(:upc) # TODO: need to add validations
  end
end
