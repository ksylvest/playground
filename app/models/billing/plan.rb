class Billing::Plan < ApplicationRecord
  belongs_to :product

  enum currency: {
    cad: 'cad',
    usd: 'usd',
    eur: 'eur',
  }

  enum inteval: {
    year: 'year',
    month: 'month',
  }

  validates :stripe_id, presence: true, uniqueness: true
  validates :amount, presence: true
  validates :currency, presence: true
  validates :interval, presence: true

  def parse(stripe)
    self.stripe_id = stripe.id
    self.amount = stripe.amount
    self.currency = stripe.currency
    self.interval = stripe.interval
  end
end
