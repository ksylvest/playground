require 'rails_helper'

RSpec.describe Notification, type: :model do
  subject { Fabricate.build(:notification) }

  it { should belong_to(:user) }
  it { should validate_presence_of(:message) }
end
