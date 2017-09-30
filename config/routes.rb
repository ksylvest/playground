require 'sidekiq/web'

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  post '/graphql', to: 'graphql#execute'

  root to: 'main#index'
  mount Sidekiq::Web, at: '/sidekiq', as: :sidekiq
  mount ActionCable.server, at: '/cable'

  resource :user, only: %i[create]
  resource :auth, only: %i[create destroy]
end
