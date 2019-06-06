module Readable
  extend ActiveSupport::Concern

  included do
    scope :read, -> { where.not(read_at: nil) }
    scope :unread, -> { where(read_at: nil) }
  end
end
