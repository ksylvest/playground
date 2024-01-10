class PresenceChannel < ApplicationCable::Channel
  def subscribed
    stream_for(authentication.user)
    authentication.appear!
  end

  def unsubscribed
    authentication.disappear!
  end
end
