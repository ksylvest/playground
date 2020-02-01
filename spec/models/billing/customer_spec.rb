require 'rails_helper'

RSpec.describe Billing::Customer, type: :model do
  subject { build(:billing_customer) }

  it { should belong_to(:user) }
  it { should have_many(:sources) }
  it { should have_one(:subscription) }

  it { should validate_presence_of(:stripe_id) }
  it { should validate_uniqueness_of(:stripe_id) }
end
