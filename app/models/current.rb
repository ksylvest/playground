class Current < ActiveSupport::CurrentAttributes
  attribute :ip
  attribute :cookies
  attribute :session

  def cookies=(cookies)
    super

    session_id = cookies.encrypted[:session_id]
    return unless session_id

    self.session = Session.active.find_by(id: session_id)
    cookies.delete(:session_id) unless session
  end

  def auth!(user)
    self.session = user.sessions.build(ip: ip)
    session.save!
    cookies.permanent.encrypted[:session_id] = session.id if cookies
    session
  end

  def deauth!
    session&.clear!
    cookies&.delete(:session_id)
    self.session = nil
  end

  def user
    session&.user
  end

  def authed?
    !user.nil?
  end
end
