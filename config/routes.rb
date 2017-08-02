require 'sidekiq/web'

Rails.application.routes.draw do
  root to: 'main#index'
  mount Sidekiq::Web, at: '/sidekiq', as: :sidekiq
end
