class Session < ApplicationRecord
  belongs_to :user

  validates :ip, presence: true

  after_initialize { self.ip ||= Current.ip }

  scope :active, -> { where(deleted_at: nil) }
end
