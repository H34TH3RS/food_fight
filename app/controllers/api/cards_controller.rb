# frozen_string_literal: true

class Api::CardsController < ApplicationController
  before_action :authorize!
  def create
    @card = CardBuilder.new(card_params['upc']).card

    if @card&.save
      current_user.cards << @card
      render json: @card.as_json(
        except: %i[created_at updated_at upc nutrition_data]
      ),
             status: :created
    elsif @card
      render json: { messages: @card.errors.full_messages },
             status: :unprocessable_entity
    else
      render json: { messages: 'Invalid UPC' },
             status: :unprocessable_entity
    end
  end

  private def card_params
    params.permit(:upc) # TODO: need to add validations
  end
end
