require 'rails_helper'

RSpec.describe Billing::Subscription, type: :model do
  subject { build(:billing_subscription) }

  it { should belong_to(:customer) }
  it { should belong_to(:plan) }

  it { should validate_presence_of(:stripe_id) }
  it { should validate_uniqueness_of(:stripe_id) }
end
