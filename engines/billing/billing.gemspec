$LOAD_PATH.push File.expand_path('lib', __dir__)

require 'billing/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |spec|
  spec.name        = 'billing'
  spec.summary     = 'Billing'
  spec.version     = Billing::VERSION
  spec.authors     = ['Kevin Sylvestre']
  spec.email       = ['kevin@ksylvest.com']
  spec.homepage    = 'https://ksylvest.com'
  spec.license     = 'MIT'

  spec.files = Dir['{app,config,db,lib}/**/*', 'Rakefile']

  spec.add_dependency 'pg'
  spec.add_dependency 'rails'
  spec.add_dependency 'stripe'
  spec.add_development_dependency 'byebug'
  spec.add_development_dependency 'factory_bot_rails'
  spec.add_development_dependency 'rspec-rails'
  spec.add_development_dependency 'shoulda'
  spec.add_development_dependency 'slim-rails'
end
