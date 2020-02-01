class Billing::Subscription < ApplicationRecord
  belongs_to :customer
  belongs_to :plan

  validates :stripe_id, presence: true, uniqueness: true

  def parse(stripe)
    self.stripe_id = stripe.id
  end
end
