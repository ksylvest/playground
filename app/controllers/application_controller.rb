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
    User.joins(:sessions).find_by(sessions: { token: token }) if token
  end

  def authenticate(user)
    session = user.sessions.find_or_initialize_by(ip: request.ip)
    session.save!

    cookies.permanent.signed[:token] = session.token
  end

  def deauthenticate
    cookies.delete(:token)
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
    cookies.permanent.signed[:token]
  end

  def store
    session[:location] = request.fullpath
  end

  def restore(default:)
    session.delete(:location) || default
  end

end
