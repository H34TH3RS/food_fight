class Admin::CardsController < Admin::BaseController
  before_action :admin_authorize!
  def index
      @cards = Card.all
  end
end
