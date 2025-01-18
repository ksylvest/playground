FactoryBot.define do
  factory :feed_comment, class: "Feed::Comment" do
    user
    entry factory: :feed_entry
    message { "The quick brown fox jumped over the lazy dog." }
    sent_at { Time.current }
  end
end
