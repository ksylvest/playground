class Current < ActiveSupport::CurrentAttributes
  attribute :ip
  attribute :session
  attribute :user

  def session_id=(session_id)
    self.session = Session.active.find(session_id) if session_id
  end

  def session=(session)
    super
    self.user = session&.user
  end
end
