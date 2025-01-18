FactoryBot.define do
  factory :authentication do
    user
    ip { "0.0.0.0" }
  end
end
