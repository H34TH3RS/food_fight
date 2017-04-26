# frozen_string_literal: true

class Api::CardsController < ApplicationController
  before_action :authorize!
  def create
    upc = card_params['upc']
    card = Card.find_by(upc: upc)
    @card = if card
              card
            else
              card_data = CardBuilder.new.build_card_from_api(upc)
              if card_data
                Card.new(card_data)
              end
            end

    if @card&.save
      current_user.cards << @card
      # TODO: except keys you don't need in json output
      render json: @card.as_json(
        except: %i[created_at updated_at upc nutrition_data]
      ),
             status: :created
    else
      render json: { messages: @card.errors.full_messages },
             status: :unprocessable_entity
    end
  end

  private def card_params
    params.permit(:upc) # TODO: need to add validations
  end
end
