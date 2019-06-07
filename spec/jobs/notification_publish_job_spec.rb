require 'rails_helper'

RSpec.describe NotificationPublishJob, type: :job do
  let(:user) { Fabricate.create(:user) }
  let(:notification) { Fabricate.create(:notification, user: user) }

  describe '#perform' do
    it 'broadcasts to the stats channels with a count' do
      expect(StatsChannel).to receive(:broadcast_to).with(user, notifications: anything)
      NotificationPublishJob.perform_now(notification)
    end
  end
end
