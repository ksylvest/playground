class NotificationPublishJob < ApplicationJob
  queue_as :default

  def perform(notification)
    user = notification.user
    StatsChannel.broadcast_to(user, notifications: user.notifications.active.unread.count)
  end
end
