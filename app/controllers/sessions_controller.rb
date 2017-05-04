# frozen_string_literal: true

class SessionsController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.find_by(email: params[:user][:email])
    if @user
      session[:current_user_id] = @user.id
      redirect_to "/admin/home"
    else
      redirect_to new_session_path, notice: 'No user found'

    end
  end

  def destroy
    session[:current_user_id] = nil
    redirect_to "/"
  end
end
