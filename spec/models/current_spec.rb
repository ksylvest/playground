require 'rails_helper'

RSpec.describe Current do
  let(:authentication) { create(:authentication, user: user) }
  let(:user) { create(:user) }

  describe '.auth!' do
    subject :auth! do
      Current.auth!(user)
    end

    it 'generates a session' do
      expect { auth! }.to change { Authentication.where(user: user).active.count }
    end
  end

  describe '.deauth!' do
    subject :deauth! do
      Current.deauth!
    end

    it 'clears a session' do
      Current.authentication = authentication
      expect { deauth! }.to change { Authentication.where(user: user).active.count }
    end
  end
end
