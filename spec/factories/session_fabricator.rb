FactoryBot.define do
  factory :session do
    association :user, strategy: :build
    ip { '0.0.0.0' }
  end
end
