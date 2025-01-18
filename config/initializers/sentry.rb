Sentry.init do |config|
  config.dsn = Rails.application.credentials.sentry_dsn unless Rails.env.local?
  config.breadcrumbs_logger = %i[active_support_logger http_logger]
  config.send_default_pii = ENV.fetch("SENTRY_SEND_DEFAULT_PII", "on").eql?("on")
end
