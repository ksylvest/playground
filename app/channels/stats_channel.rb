class StatsChannel < ApplicationCable::Channel
  def subscribed
    stream_for(authentication.user)
    transmit(notifications: authentication.user.notifications.active.unread.count)
  end
end
