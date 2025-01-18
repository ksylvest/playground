FactoryBot.define do
  factory :user do
    sequence(:name) { |index| "User ##{index}" }
    sequence(:email) { |index| "user#{index}@playground.test" }
    password { "secret" }

    trait :with_avatar do
      after :build do |user|
        io = Rails.root.join("spec/fixtures/files/photo.png").open
        user.avatar.attach(io:, filename: "photo.svg", content_type: "image/svg")
      end
    end
  end
end
