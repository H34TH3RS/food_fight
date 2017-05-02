class Admin::UsersController < Admin::BaseController
  before_action :admin_authorize!
  before_action :set_user, only: [:edit, :update, :destroy]

  def index
    @users = User.all
  end

  def edit; end

  def update

  end

  def destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def admin_user_params
    params.require(:user).permit(:role)
  end
end
