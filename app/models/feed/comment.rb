class Feed::Comment < ApplicationRecord
  belongs_to :user
  belongs_to :entry
  validates :message, presence: true
end
