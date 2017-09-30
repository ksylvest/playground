require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web, at: '/sidekiq', as: :sidekiq
  mount ActionCable.server, at: '/cable'
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'

  post '/graphql', to: 'graphql#execute'

  root to: 'main#index'
  %w[login signup].each do |path|
    get path, to: 'main#index'
  end

  resource :user, only: %i[create]
  resource :auth, only: %i[create destroy]
end
