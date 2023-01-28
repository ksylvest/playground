class Hook::Event < ApplicationRecord
  belongs_to :provider
  validates :data, presence: true
end
