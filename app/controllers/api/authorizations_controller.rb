# frozen_string_literal: true

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
    @user = User.find_by(email: current_user.email)
    @user.reset_auth_token!
  end
end
