require 'rails_helper'

RSpec.describe Current, type: :model do
  let(:session) { create(:session, user: user) }
  let(:user) { create(:user) }

  describe '.auth!' do
    subject :auth! do
      Current.auth!(user)
    end

    it 'generates a session' do
      expect { auth! }.to change { Session.where(user: user).active.count }
    end
  end

  describe '.deauth!' do
    subject :deauth! do
      Current.deauth!
    end

    it 'clears a session' do
      Current.session = session
      expect { deauth! }.to change { Session.where(user: user).active.count }
    end
  end
end
