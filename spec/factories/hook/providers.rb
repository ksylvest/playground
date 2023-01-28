FactoryBot.define do
  factory :hook_provider, class: 'Hook::Provider' do
    slug { "stripe" }
    name { "Stripe" }
    token { "abcdef" }
  end
end
