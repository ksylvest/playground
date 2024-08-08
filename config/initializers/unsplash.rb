Rails.application.config.to_prepare do
  Unsplash.configure do |config|
    config.access_key = Rails.application.credentials.unsplash_access_key
    config.secret_key = Rails.application.credentials.unsplash_secret_key
  end
end
