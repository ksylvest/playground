module Authentication
  extend ActiveSupport::Concern

  included do
    before_action do
      Current.ip = request.ip
      Current.session = Session.active.find_by(id: cookies.encrypted[:session_id]) if cookies.encrypted[:session_id]
    end
  end
end
