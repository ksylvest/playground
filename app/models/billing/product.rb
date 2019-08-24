class Billing::Product < ApplicationRecord
  has_many :plans, dependent: :destroy

  validates :stripe_id, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true

  def parse(stripe)
    self.stripe_id = stripe.id
    self.name = stripe.name
  end
end
