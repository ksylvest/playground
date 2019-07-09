class PresenceChannel < ApplicationCable::Channel
  def subscribed
    stream_for(session.user)
    session.appear!
  end

  def unsubscribed
    session.disappear!
  end
end
