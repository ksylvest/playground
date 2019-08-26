FactoryBot.define do
  factory :feed_entry, class: 'Feed::Entry' do
    user

    trait :with_photos do
      after :build do |entry|
        io = File.open(Rails.root.join('spec', 'fixtures', 'files', 'photo.png'))
        entry.photos.attach(io: io, filename: 'photo.svg', content_type: 'image/svg')
      end
    end
  end
end
