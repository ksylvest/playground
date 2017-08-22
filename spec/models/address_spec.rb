require 'rails_helper'

RSpec.describe Address, type: :model do
  subject { Fabricate.build(:address) }
  it { should have_one(:company) }
  it { should validate_presence_of(:street) }
  it { should validate_presence_of(:city) }
  it { should validate_presence_of(:state) }
  it { should validate_presence_of(:country) }
  it { should validate_presence_of(:postal) }
end
