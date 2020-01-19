class Billing::Source < ApplicationRecord
  belongs_to :customer

  enum funding: {
    credit: 'credit',
    debit: 'debit',
    prepaid: 'prepaid',
    unknown: 'unknown',
  }

  validates :stripe_id, presence: true, uniqueness: true
  validates :brand, presence: true
  validates :funding, presence: true
  validates :number, presence: true
  validates :exp_month, presence: true
  validates :exp_year, presence: true

  def parse(stripe)
    self.stripe_id = stripe.id
    self.brand = stripe.brand
    self.funding = stripe.funding
    self.number = stripe.last4 || stripe.last3
    self.exp_month = stripe.exp_month
    self.exp_year = stripe.exp_year
  end
end
