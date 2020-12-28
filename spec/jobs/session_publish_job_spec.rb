require 'rails_helper'

RSpec.describe SessionPublishJob, type: :job do
  let(:user) { create(:user) }
  let(:session) { create(:session, user: user) }

  describe '#perform' do
    subject(:perform) { described_class.new.perform(session) }

    it 'broadcasts to the stats channels with a count' do
      expect { perform }
        .to have_broadcasted_to(user)
        .from_channel(PresenceChannel)
        .with(a_hash_including(id: session.id))
    end
  end
end
