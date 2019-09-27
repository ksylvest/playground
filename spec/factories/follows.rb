FactoryBot.define do
  factory :follow do
    association(:followed, factory: :user)
    association(:follower, factory: :user)
  end
end
