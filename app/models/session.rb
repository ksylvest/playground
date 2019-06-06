class Session < ApplicationRecord
  include Activatable

  belongs_to :user

  validates :ip, presence: true

  after_commit { GeoIPBuilderJob.new(String(ip)).enqueue }
  after_initialize { self.ip ||= Current.ip }
end
