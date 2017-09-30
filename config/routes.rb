require 'sidekiq/web'

Rails.application.routes.draw do
  root to: 'main#index'
  mount Sidekiq::Web, at: '/sidekiq', as: :sidekiq
  mount ActionCable.server, at: '/cable'

  resource :user, only: %i[create]
  resource :auth, only: %i[create destroy]

end
