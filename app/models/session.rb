class Session < ApplicationRecord
  enum status: { online: 'online', offline: 'offline' }

  include Activatable

  belongs_to :user

  validates :ip, presence: true

  after_commit { GeoIPBuilderJob.new(String(ip)).enqueue }
  after_initialize { self.ip ||= Current.ip }
  after_initialize { self.seen_at ||= Time.current }

  scope :chronological, -> { order(seen_at: :desc) }

  def clear!
    self.deleted_at = Time.current
    save!
  end

  def appear!
    self.seen_at = Time.current
    online!
    save!
    SessionPublishJob.new(self).enqueue
  end

  def disappear!
    self.seen_at = Time.current
    offline!
    save!
    SessionPublishJob.new(self).enqueue
  end
end
