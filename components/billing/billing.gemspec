require_relative "lib/billing/version"

Gem::Specification.new do |spec|
  spec.name        = "billing"
  spec.version     = Billing::VERSION
  spec.authors     = ["Kevin Sylvestre"]
  spec.email       = ["kevin@ksylvest.com"]
  spec.homepage    = "https://github.com/ksylvest/playground"
  spec.summary     = "Billing"
  spec.license     = "MIT"

  spec.metadata["allowed_push_host"] = "http://ksylvest.com'"

  spec.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  spec.add_dependency "rails"
end
