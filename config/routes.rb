Rails.application.routes.draw do
  mount ActionCable.server, at: "/cable"

  get "up", to: "rails/health#show"

  root to: "main#index"
  post "/graphql", to: "graphql#execute", as: :graphql

  resource :robots, only: :show, defaults: { format: :text }
  resource :sitemap, only: :show, defaults: { format: :xml }
  resources :attachments, only: :show

  constraints format: :html do
    %w[
      login
      signup
      notifications
      settings
      settings/authentications
      settings/avatar
      settings/billing
      settings/password
      settings/profile
    ].each do |path|
      get path, to: "main#index", as: path
    end

    get "profile/:id", to: "main#index", as: :profile
    get "feed/entries/:id", to: "main#index", as: :feed_entry
  end
end
