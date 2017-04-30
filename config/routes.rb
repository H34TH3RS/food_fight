Rails.application.routes.draw do
  namespace :api do
    resource :authorization, only: [:create, :destroy]
    resource :users, only: [:create]
    resource :cards, only: [:create]
    resources :card_assignments, only: [:index]
  end
end
