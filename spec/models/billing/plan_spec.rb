require 'rails_helper'

RSpec.describe Billing::Plan, type: :model do
  subject { build(:billing_plan) }

  it { should belong_to(:product) }

  it { should validate_presence_of(:stripe_id) }
  it { should validate_uniqueness_of(:stripe_id) }

  describe '#parse' do
    let(:stripe) { build_stubbed(:stripe_plan) }

    it 'parses stripe' do
      source = Billing::Plan.new
      source.parse(stripe)
      expect(source.stripe_id).to eql(stripe.id)
      expect(source.amount).to eql(stripe.amount)
      expect(source.currency).to eql(stripe.currency)
      expect(source.interval).to eql(stripe.interval)
    end
  end
end
