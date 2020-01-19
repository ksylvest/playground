require 'factory_bot'

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end

FactoryBot.definition_file_paths = [
  Rails.root.join('spec/factories'),
  ::Billing::Engine.root.join('spec/factories'),
]
FactoryBot.find_definitions
