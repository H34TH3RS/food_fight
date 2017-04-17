class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  helper_method :current_user
  def current_user
    if request.headers["HTTP_AUTHORIZATION"]
      auth_header = request.headers["HTTP_AUTHORIZATION"]
      token = auth_header.split(' ').last
      @current_user ||= User.where(auth_token: token)
    end
  end
end
