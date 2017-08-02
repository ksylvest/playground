require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq', as: :sidekiq
  mount ActionCable.server, at: '/cable'

  root to: 'main#index'

  constraints format: :html do
    %w[login signup checkout recovery].each do |path|
      get path, to: 'main#index', as: path
    end
  end

  namespace :api do
    constraints format: :json do
      resource :user, only: %i[create]
      resource :auth, only: %i[create destroy]
      resource :demo, only: %i[show]
    end
  end
end
