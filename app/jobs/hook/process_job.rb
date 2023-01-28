class Hook::ProcessJob < ApplicationJob
  queue_as :default

  # @param [Hook::Event]
  def perform(event)    
    event.with_lock do
      return if event.processed_at?

      process!(event)
      event.touch(:processed_at)
    end
  end
end
