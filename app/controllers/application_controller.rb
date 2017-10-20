class ApplicationController < ActionController::Base
  include Pundit

  etag { user&.id }

  protect_from_forgery with: :exception

  helper_method :user
  helper_method :authenticated?

  force_ssl if: :ssl?

private

  def ssl?
    Rails.env.production?
  end

public

  def user
    payload = Session.decode(cookies[:jwt]) if cookies[:jwt]
    User.joins(:sessions).find_by(sessions: { token: payload['token'] }) if payload
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

  def authenticate!
    return if authenticated?
    store
    respond_to do |format|
      format.html { redirect_to root_path, alert: t('flash.authenticate') }
    end
  end

  def deauthenticate!
    return unless authenticated?
    store
    respond_to do |format|
      format.html { redirect_to root_path, alert: t('flash.deauthenticate') }
    end
  end

protected

  def token
    JWT.decode(cookies[:token], Rails.application.secrets.secret_key_base)
    cookies.permanent.signed[:token]
  end

  def store
    session[:location] = request.fullpath
  end

  def restore(default:)
    session.delete(:location) || default
  end

end
