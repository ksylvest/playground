require 'rails_helper'

RSpec.describe NotificationPublishJob, type: :job do
  let(:user) { Fabricate.create(:user) }
  let(:notification) { Fabricate.create(:notification, user: user, read_at: Time.current) }

  describe '#perform' do
    it 'broadcasts to the stats channels with a count' do
      Fabricate.create(:notification, user: user)
      Fabricate.create(:notification, user: user)

      expect(StatsChannel).to receive(:broadcast_to).with(user, notifications: 2)
      NotificationPublishJob.new.perform(notification)
    end
  end
end
