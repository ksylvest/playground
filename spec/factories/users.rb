FactoryBot.define do
  factory :user do
    sequence(:name) { |index| "User ##{index}" }
    sequence(:email) { |index| "user#{index}@playground.test" }
    password { 'secret' }

    trait :with_avatar do
      after :build do |user|
        io = File.open(Rails.root.join('spec/fixtures/files/photo.png'))
        user.avatar.attach(io: io, filename: 'photo.svg', content_type: 'image/svg')
      end
    end
  end
end
