# frozen_string_literal: true

class Admin::BaseController < ApplicationController
  def admin_authorize!
    redirect_to new_session_path unless current_user && current_user.admin?
  end
end
