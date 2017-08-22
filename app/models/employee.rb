class Employee < ApplicationRecord
  belongs_to :company
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
