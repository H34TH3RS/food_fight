# frozen_string_literal: true

class Api::CardsController < ApplicationController
  def create
    upc = user_params['upc']
    card = Card.find_by(upc: upc)
    @card = if card
              card
            else
              Card.new(CardBuilder.new.build_card_from_api(upc))
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
end
