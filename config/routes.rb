Rails.application.routes.draw do
  namespace :api do
    resource :authorization, only: [:create, :destroy]
    resource :users, only: [:create]
  end
end
