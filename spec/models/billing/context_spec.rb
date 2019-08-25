require 'rails_helper'

RSpec.describe Billing::Context, type: :model do
  subject(:context) { Billing::Context.new(user: user) }

  let(:user) { create(:user) }
  let!(:customer) { create(:billing_customer, user: user) }

  describe '#customer' do
    it { expect(context.customer).to eql(customer) }
  end
end
