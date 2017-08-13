class Company < ApplicationRecord
  belongs_to :address
  has_many :employees
  validates :name, presence: true, uniqueness: true

  def as_json(_options = nil)
    { id: id, name: name, employees: employees.map(&:as_json), address: address.as_json }
  end

end
