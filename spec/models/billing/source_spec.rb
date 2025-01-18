require "rails_helper"

RSpec.describe Billing::Source do
  subject { build(:billing_source) }

  it { is_expected.to belong_to(:customer) }

  it { is_expected.to validate_presence_of(:stripe_id) }
  it { is_expected.to validate_uniqueness_of(:stripe_id) }
  it { is_expected.to validate_presence_of(:brand) }
  it { is_expected.to validate_presence_of(:funding) }
  it { is_expected.to validate_presence_of(:number) }
  it { is_expected.to validate_presence_of(:exp_month) }
  it { is_expected.to validate_presence_of(:exp_year) }

  describe "#parse" do
    let(:stripe) { build_stubbed(:stripe_source) }

    it "parses stripe" do
      source = Billing::Source.new
      source.parse(stripe)
      expect(source.stripe_id).to eql(stripe.id)
      expect(source.brand).to eql("visa")
      expect(source.funding).to eql("credit")
      expect(source.number).to eql("0000")
      expect(source.exp_month).to eql(stripe.exp_month)
      expect(source.exp_year).to eql(stripe.exp_year)
    end
  end
end
