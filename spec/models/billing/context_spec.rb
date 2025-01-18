require "rails_helper"

RSpec.describe Billing::Context do
  subject(:context) { Billing::Context.new(user:) }

  let(:user) { create(:user) }
  let!(:customer) { create(:billing_customer, user:) }

  describe "#customer" do
    it { expect(context.customer).to eql(customer) }
  end
end
