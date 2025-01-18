FactoryBot.define do
  factory :notification do
    user
    message { "Welcome!" }
  end
end
