module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :authenticate
  end

private

  def authenticate
    Current.ip = request.ip
    Current.session_id = cookies.encrypted[:session_id]
  end
end
