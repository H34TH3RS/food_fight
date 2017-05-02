# frozen_string_literal: true

class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by(email: params[:user][:email])
    session[:current_user_id] = @user.id
    redirect_to admin_cards_path
  end

  def destroy
    session[:current_user_id] = @user.id
    redirect_to new_session_path
  end
end
