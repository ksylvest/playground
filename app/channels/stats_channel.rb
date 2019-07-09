class StatsChannel < ApplicationCable::Channel
  def subscribed
    stream_for(session.user)
    transmit(notifications: session.user.notifications.active.unread.count)
  end
end
