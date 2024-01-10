class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action { Current.ip = request.ip }
end
