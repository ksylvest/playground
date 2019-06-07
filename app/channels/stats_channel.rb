class StatsChannel < ApplicationCable::Channel
  def subscribed
    stream_for(user)
    transmit(notifications: user.notifications.active.unread.count)
  end
end
