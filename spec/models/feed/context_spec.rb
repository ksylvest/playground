require "rails_helper"

RSpec.describe Feed::Context do
  subject(:context) { Feed::Context.new }

  let!(:entry) { create(:feed_entry) }

  describe "#entries" do
    it { expect(context.entries).to include(entry) }
  end
end
