class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action do
    ActiveStorage::Current.host = request.base_url
    Current.ip = request.ip
    Current.cookies = cookies
  end
end
