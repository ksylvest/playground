module ApplicationHelper
  def viewport
    'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
  end

  def release
    "#{ENV.fetch('HEROKU_APP_NAME') { 'playground' }}@#{ENV.fetch('HEROKU_RELEASE_VERSION') { 'local' }}"
  end
end
