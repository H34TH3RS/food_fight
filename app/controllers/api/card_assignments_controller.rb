# frozen_string_literal: true

class Api::CardAssignmentsController < ApplicationController
  before_action :authorize!
  def index
    @cards = current_user.cards.where('card_assignments.expires_at >= ?', Time.current).order('card_assignments.updated_at desc')
    render json: @cards.as_json
  end
end
