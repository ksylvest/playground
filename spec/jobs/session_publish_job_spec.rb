require 'rails_helper'

RSpec.describe SessionPublishJob, type: :job do
  let(:user) { Fabricate(:user) }
  let(:session) { Fabricate(:session, user: user) }

  describe '#perform' do
    it 'broadcasts to the stats channels with a count' do
      expect(PresenceChannel).to receive(:broadcast_to).with(user, id: session.id)
      SessionPublishJob.perform_now(session)
    end
  end
end
