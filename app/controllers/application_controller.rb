class ApplicationController < ActionController::Base
  etag { user&.id }

  protect_from_forgery with: :exception

  helper_method :user
  helper_method :authenticated?

  force_ssl if: -> { Rails.env.production? }

protected

  def user
    payload = Session.decode(cookies[:jwt]) if cookies[:jwt]
    Session.find_by(token: payload['token'])&.user if payload
  end

  def authenticate(user)
    session = user.sessions.find_or_initialize_by(ip: request.ip)
    session.save!

    payload = { id: user.id, name: user.name, token: session.token }
    cookies.permanent[:jwt] = Session.encode(payload)
  end

  def deauthenticate
    cookies.delete(:jwt)
  end

  def authenticated?
    user
  end

end
