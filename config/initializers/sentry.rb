Sentry.init do |config|
  config.dsn = Rails.application.credentials.sentry_dsn unless Rails.env.local?
end
