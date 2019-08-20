FactoryBot.define do
  factory :session do
    user
    ip { '0.0.0.0' }
  end
end
