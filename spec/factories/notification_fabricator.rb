FactoryBot.define do
  factory :notification do
    association :user, strategy: :build
    message { 'Welcome!' }
  end
end
