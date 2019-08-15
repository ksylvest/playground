FactoryBot.define do
  factory :user do
    name { 'Kevin Sylvestre' }
    sequence(:email) { |index| "user#{index}@playground.test" }
    password { 'secret' }
  end
end
