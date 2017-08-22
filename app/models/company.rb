class Company < ApplicationRecord
  belongs_to :address
  has_many :employees
  validates :name, presence: true, uniqueness: true
end
