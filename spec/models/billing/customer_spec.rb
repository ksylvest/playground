require "rails_helper"

RSpec.describe Billing::Customer do
  subject { build(:billing_customer) }

  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_many(:sources) }

  it { is_expected.to validate_presence_of(:stripe_id) }
  it { is_expected.to validate_uniqueness_of(:stripe_id) }
end
