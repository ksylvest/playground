class Employee < ApplicationRecord
  belongs_to :company
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true

  def as_json(_options = nil)
    { id: id, name: name, email: email }
  end

end
