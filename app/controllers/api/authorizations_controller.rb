class Api::AuthorizationsController < ApplicationController
  def create
    @user = User.find_by(email: params[:email])
    if @user && @user.authenticate(params[:password])
      render json: { auth_token: @user.auth_token }, status: :ok
    else
      render json: { message: 'no user found' }, status: :unauthorized
    end
  end

  def destroy
    @user.set_auth_token
    @user.save
  end
end
