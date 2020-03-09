require 'hello_sign'

HelloSign.configure do |config|
  config.api_key = Rails.application.credentials.hello_sign_api_key
  config.client_id = Rails.application.credentials.hello_sign_client_id
end
