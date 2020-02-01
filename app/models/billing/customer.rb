class Billing::Customer < ApplicationRecord
  belongs_to :user
  has_many :sources, dependent: :destroy
  has_one :subscription, dependent: :destroy

  enum currency: {
    cad: 'cad',
    usd: 'usd',
  }

  validates :stripe_id, presence: true, uniqueness: true

  def parse(stripe)
    self.stripe_id = stripe.id
  end
end
