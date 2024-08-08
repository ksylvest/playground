Rails.application.config.to_prepare do
  IPStack.configure do |config|
    config.access_key = Rails.application.credentials.ipstack_access_key
  end
end
