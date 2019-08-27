FactoryBot.define do
  factory :feed_like, class: 'Feed::Like' do
    user
    association(:entry, factory: :feed_entry)
  end
end
