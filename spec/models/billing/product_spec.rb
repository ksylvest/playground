require 'rails_helper'

RSpec.describe Billing::Product, type: :model do
  subject { build(:billing_product) }

  it { should have_many(:plans) }
  it { should validate_presence_of(:stripe_id) }
  it { should validate_uniqueness_of(:stripe_id) }

  describe '#parse' do
    let(:stripe) { build_stubbed(:stripe_product) }

    it 'parses stripe' do
      source = Billing::Product.new
      source.parse(stripe)
      expect(source.stripe_id).to eql(stripe.id)
      expect(source.name).to eql(stripe.name)
    end
  end
end
