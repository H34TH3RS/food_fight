# frozen_string_literal: true

class Api::CardAssignmentsController < ApplicationController
  before_action :authorize!
  def index
    @cards = current_user.cards
    render json: @cards.as_json
  end
end
