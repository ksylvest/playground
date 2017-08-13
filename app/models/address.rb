class Address < ApplicationRecord
  has_one :company
  validates :street, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :country, presence: true
  validates :postal, presence: true

  def as_json(_options = nil)
    { id: id, street: street, city: city, state: state, country: country, postal: postal }
  end

end
