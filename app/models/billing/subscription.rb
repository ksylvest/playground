class Billing::Subscription < ApplicationRecord
  belongs_to :customer
  belongs_to :plan

  validates :stripe_id, presence: true, uniqueness: true
end
