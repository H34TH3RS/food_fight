# frozen_string_literal: true

class Admin::UsersController < Admin::BaseController
  before_action :admin_authorize!
  before_action :set_user, only: %i[edit update]

  def index
    @users = User.all
  end

  def edit; end

  def update
    if @user.update(admin_user_params)
      redirect_to admin_users_path, notice: 'User updated'
    else
      render :edit, @user.errors.full_messages
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def admin_user_params
    params.require(:user).permit(:role)
  end
end
