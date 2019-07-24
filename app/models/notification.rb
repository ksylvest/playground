class Notification < ApplicationRecord
  include Activatable
  include Readable

  belongs_to :user

  validates :message, presence: true

  after_initialize { self.sent_at ||= Time.current }
  after_commit { NotificationPublishJob.new(self).enqueue }

  scope :chronological, -> { order(sent_at: :desc) }

  def clear!
    self.deleted_at = Time.current
    save!
  end

  def read!
    self.read_at = Time.current
    save!
  end
end
