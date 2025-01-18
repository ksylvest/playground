require "rails_helper"

RSpec.describe NotificationPublishJob do
  let(:user) { create(:user) }
  let(:notification) { create(:notification, user:) }

  describe "#perform" do
    subject(:perform) { described_class.new.perform(notification) }

    it "broadcasts to the stats channels with a count" do
      expect { perform }
        .to have_broadcasted_to(user)
        .from_channel(StatsChannel)
        .with(a_hash_including(notifications: anything))
    end
  end
end
