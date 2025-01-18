require "rails_helper"

RSpec.describe AuthenticationPublishJob do
  let(:user) { create(:user) }
  let(:authentication) { create(:authentication, user:) }

  describe "#perform" do
    subject(:perform) { described_class.new.perform(authentication) }

    it "broadcasts to the stats channels with a count" do
      expect { perform }
        .to have_broadcasted_to(user)
        .from_channel(PresenceChannel)
        .with(a_hash_including(id: authentication.id))
    end
  end
end
