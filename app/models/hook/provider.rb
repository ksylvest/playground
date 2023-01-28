class Hook::Provider < ApplicationRecord
  has_many :events

  validates :name, presence: true, uniqueness: true
  validates :slug, presence: true, uniqueness: true
  has_secure_password :token
end
