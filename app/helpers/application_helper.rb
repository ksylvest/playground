module ApplicationHelper
  def release
    "#{ENV.fetch('HEROKU_APP_NAME') { 'playground' }}@#{ENV.fetch('HEROKU_RELEASE_VERSION') { 'local' }}"
  end
end
