FactoryBot.define do
  factory :follow do
    followed factory: :user
    follower factory: :user
  end
end
