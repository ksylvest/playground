require 'rails_helper'

RSpec.describe Session, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:ip) }

  describe '#appear!' do
    let(:session) { Fabricate(:session, status: 'offline') }
    subject(:appear!) { session.appear! }
    it { expect { appear! }.to change { session.status }.from('offline').to('online') }
    it { expect { appear! }.to have_enqueued_job(SessionPublishJob).with(session) }
  end

  describe '#disappear!' do
    let(:session) { Fabricate(:session, status: 'online') }
    subject(:disappear!) { session.disappear! }
    it { expect { disappear! }.to change { session.status }.from('online').to('offline') }
    it { expect { disappear! }.to have_enqueued_job(SessionPublishJob).with(session) }
  end
end
