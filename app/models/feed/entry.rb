class Feed::Entry < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many_attached :photos
end
