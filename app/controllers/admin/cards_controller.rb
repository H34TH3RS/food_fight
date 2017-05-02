# frozen_string_literal: true

class Admin::CardsController < Admin::BaseController
  before_action :admin_authorize!
  before_action :set_card, only: %i[show destroy]

  def index
    @cards = Card.all
  end

  def new
    @card = Card.new
  end

  def create
    @card = Card.new(card_params)
    current_user.cards << @card
    @card.card_assignments.last.expires_at = Time.current
    @card.save
  end

  def show; end

  def destroy
    @card.card_assignments.destroy_all
    @card.destroy
    redirect_to admin_cards_path
  end

  private def set_card
    @card = Card.find(params[:id])
  end
end
