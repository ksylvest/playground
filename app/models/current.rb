class Current < ActiveSupport::CurrentAttributes
  attribute :ip
  attribute :cookies
  attribute :session

  def cookies=(cookies)
    super
    session_id = cookies.encrypted[:session_id]
    self.session = Session.active.find_by(id: session_id) if session_id
  end

  def authed?
    user.present?
  end

  def auth!(user:)
    self.session = user.sessions.build
    session.save!
    cookies.permanent.encrypted[:session_id] = session.id
  end

  def deauth!
    cookies.delete(:session_id)
    session&.clear!
    self.session = nil
  end

  def user
    session&.user
  end
end
