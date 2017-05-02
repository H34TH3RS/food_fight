# frozen_string_literal: true

class Admin::CardsController < Admin::BaseController
  before_action :admin_authorize!
  def index
    @cards = Card.all
  end

  def new
    @card = Card.new
  end

  def create
    @card = Card.new(card_params)
    @card.save
    @card.card_assignments.last.expires_at = Time.current
  end

  private def card_params
    params.require(:card).permit
  end
end
