class Current < ActiveSupport::CurrentAttributes
  attribute :ip
  attribute :cookies
  attribute :session
  attribute :authentication

  def cookies=(cookies)
    super

    authentication_id = cookies.encrypted[:authentication_id]
    return unless authentication_id

    self.authentication = Authentication.active.find_by(id: authentication_id)
    cookies.delete(:authentication_id) unless authentication
  end

  def auth!(user)
    self.authentication = user.authentications.build(ip:)
    authentication.save!
    cookies.permanent.encrypted[:authentication_id] = authentication.id if cookies
    authentication
  end

  def deauth!
    authentication&.clear!
    cookies&.delete(:authentication_id)
    self.session = nil
  end

  def user
    authentication&.user
  end

  def authed?
    !user.nil?
  end
end
