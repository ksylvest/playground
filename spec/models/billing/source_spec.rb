require 'rails_helper'

RSpec.describe Billing::Source, type: :model do
  subject { build(:billing_source) }

  it { should belong_to(:customer) }

  it { should validate_presence_of(:stripe_id) }
  it { should validate_uniqueness_of(:stripe_id) }
  it { should validate_presence_of(:brand) }
  it { should validate_presence_of(:funding) }
  it { should validate_presence_of(:number) }
  it { should validate_presence_of(:exp_month) }
  it { should validate_presence_of(:exp_year) }

  describe '#parse' do
    let(:stripe) { build_stubbed(:stripe_source) }

    it 'parses stripe' do
      source = Billing::Source.new
      source.parse(stripe)
      expect(source.stripe_id).to eql(stripe.id)
      expect(source.brand).to eql('Visa')
      expect(source.funding).to eql('credit')
      expect(source.number).to eql('0000')
      expect(source.exp_month).to eql(stripe.exp_month)
      expect(source.exp_year).to eql(stripe.exp_year)
    end
  end
end
