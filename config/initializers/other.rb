Rails.application.config.session_store :cookie_store, key: '_playground_session'
Rails.application.config.action_dispatch.cookies_serializer = :json
Rails.application.config.filter_parameters += [:password]

ActiveSupport.on_load(:action_controller) do
  wrap_parameters format: [:json]
end
