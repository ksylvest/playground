class Hook::ProcessSlackJob < Hook::ProcessJob
  def process!(event)
    Rails.logger.info("TODO: handle the webhook for stripe #{event.data[:id]}")
  end
end
