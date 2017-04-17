Rails.application.routes.draw do
  namespace :api do
    resource :auth, only: [:new, :create, :destroy]
    resource :users, only: [:new, :create]
  end
end
