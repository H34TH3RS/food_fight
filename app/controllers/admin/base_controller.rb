# frozen_string_literal: true

class Admin::BaseController < ApplicationController
  def admin_authorize!
    redirect_to root_path unless current_user && current_user.admin?
  end
end
