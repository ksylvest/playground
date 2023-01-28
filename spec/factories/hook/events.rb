FactoryBot.define do
  factory :hook_event, class: 'Hook::Event' do
    provider { nil }
    data { "" }
    processed_at { "2023-01-27 17:43:26" }
  end
end
