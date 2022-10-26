require 'rails_helper'

RSpec.describe Authentication do
  it { should belong_to(:user) }
  it { should validate_presence_of(:ip) }

  describe '#appear!' do
    subject(:appear!) { authentication.appear! }

    let(:authentication) { create(:authentication, status: 'offline') }

    it { expect { appear! }.to change(authentication, :status).from('offline').to('online') }
    it { expect { appear! }.to have_enqueued_job(AuthenticationPublishJob).with(authentication) }
  end

  describe '#disappear!' do
    subject(:disappear!) { authentication.disappear! }

    let(:authentication) { create(:authentication, status: 'online') }

    it { expect { disappear! }.to change(authentication, :status).from('online').to('offline') }
    it { expect { disappear! }.to have_enqueued_job(AuthenticationPublishJob).with(authentication) }
  end
end
