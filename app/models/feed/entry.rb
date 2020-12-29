class Feed::Entry < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many_attached :photos

  scope :for, ->(user:) { where(user: user) if user }
end
