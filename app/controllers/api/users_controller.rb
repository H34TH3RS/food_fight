# frozen_string_literal: true

class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: { auth_token: @user.auth_token }, status: :created
    else
      error = @user.errors.messages
      render json: { message: error.to_s }, status: :unprocessable_entity
    end
  end

  private def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end
end
