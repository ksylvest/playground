require 'rails_helper'

RSpec.describe Company, type: :model do
  subject { Fabricate.build(:company) }
  it { should belong_to(:address) }
  it { should have_many(:employees) }
  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }
end
