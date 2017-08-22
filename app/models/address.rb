class Address < ApplicationRecord
  has_one :company
  validates :street, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :country, presence: true
  validates :postal, presence: true
end
