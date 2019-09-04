Rails.application.routes.draw do
  mount ActionCable.server, at: '/cable'

  root to: 'main#index'
  post '/graphql', to: 'graphql#execute', as: :graphql

  resource :robots, only: :show, defaults: { format: :text }
  resource :sitemap, only: :show, defaults: { format: :xml }

  constraints format: :html do
    %w[
      login
      signup
      notifications
      settings
      settings/avatar
      settings/billing
      settings/password
      settings/profile
      settings/sessions
    ].each do |path|
      get path, to: 'main#index', as: path
    end

    get 'feed/entries/:id', to: 'main#index', as: :feed_entry
  end
end
