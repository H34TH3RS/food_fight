# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  helper_method :current_user

  def current_user
    if request.headers['HTTP_AUTHORIZATION']
      auth_header = request.headers['HTTP_AUTHORIZATION']
      token = auth_header.split(' ').last
      @current_user ||= User.find_by(auth_token: token)
    elsif session[:current_user_id]
      @current_user ||= User.find_by(id: session[:current_user_id])
    end
  end

  def authorize!
    unless current_user
      render json: { message: 'Please log in!' },
             status: :unauthorized
    end
  end
end
