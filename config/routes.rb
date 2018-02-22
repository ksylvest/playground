require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq', as: :sidekiq
  mount ActionCable.server, at: '/cable'

  root to: 'main#index'

  constraints format: :html do
    %w[login signup checkout].each do |path|
      get path, to: 'main#index', as: path
    end
  end

  constraints format: :json do
    resource :user, only: %i[create]
    resource :auth, only: %i[create destroy]
  end
end
