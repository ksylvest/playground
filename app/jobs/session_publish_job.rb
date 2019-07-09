class SessionPublishJob < ApplicationJob
  queue_as :default

  def perform(session)
    user = session.user
    PresenceChannel.broadcast_to(user, id: session.id)
  end
end
