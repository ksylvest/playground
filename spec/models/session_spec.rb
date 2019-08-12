require 'rails_helper'

RSpec.describe Session, type: :model do
  it { should belong_to(:user) }
  it { should validate_presence_of(:ip) }

  describe '#appear!' do
    subject(:appear!) { session.appear! }

    let(:session) { create(:session, status: 'offline') }

    it { expect { appear! }.to change(session, :status).from('offline').to('online') }
    it { expect { appear! }.to have_enqueued_job(SessionPublishJob).with(session) }
  end

  describe '#disappear!' do
    subject(:disappear!) { session.disappear! }

    let(:session) { create(:session, status: 'online') }

    it { expect { disappear! }.to change(session, :status).from('online').to('offline') }
    it { expect { disappear! }.to have_enqueued_job(SessionPublishJob).with(session) }
  end
end
