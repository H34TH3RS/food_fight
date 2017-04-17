Rails.application.routes.draw do
  namespace :api do
    resource :auth, only: [:create, :destroy]
    resource :users, only: [:create]
  end
end
