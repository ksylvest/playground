Rails.application.routes.draw do
  mount ActionCable.server, at: '/cable'

  root to: 'main#index'
  post '/graphql', to: 'graphql#execute', as: :graphql

  constraints format: :html do
    %w[
      login
      signup
      notifications
      settings
      settings/avatar
      settings/password
      settings/profile
      settings/sessions
    ].each do |path|
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
