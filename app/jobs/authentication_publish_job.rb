class AuthenticationPublishJob < ApplicationJob
  queue_as :default

  def perform(authentication)
    user = authentication.user
    PresenceChannel.broadcast_to(user, id: authentication.id)
  end
end
