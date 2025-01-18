FactoryBot.define do
  factory :feed_entry, class: "Feed::Entry" do
    user

    trait :with_photos do
      after :build do |entry|
        io = Rails.root.join("spec/fixtures/files/photo.png").open
        entry.photos.attach(io:, filename: "photo.svg", content_type: "image/svg")
      end
    end
  end
end
