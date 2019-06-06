class Notification < ApplicationRecord
  include Activatable
  include Readable

  belongs_to :user

  validates :message, presence: true

  after_initialize { self.sent_at ||= Time.current }

  scope :chronological, -> { order(:sent_at) }
end
