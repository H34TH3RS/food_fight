Rails.application.routes.draw do
  namespace :admin do
    resources :cards, only: [:index, :new, :create, :show, :destroy]
    resources :card_assignments 
  end

  namespace :api do
    resource :authorization, only: [:create, :destroy]
    resource :users, only: [:create]
    resource :cards, only: [:create]
    resources :card_assignments, only: [:index]
  end

  resources :sessions, only: [:new, :create, :destroy]
end
