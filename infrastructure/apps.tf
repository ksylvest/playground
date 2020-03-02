resource "heroku_app" "staging" {
  name = "plygnd-staging"
  region = "us"
  buildpacks = [
    "heroku-community/apt",
    "heroku/nodejs",
    "heroku/ruby",
  ]
  config_vars = {
    NODE_ENV = "production"
    RACK_ENV = "production"
    RAILS_ENV = "production"
    RAILS_LOG_TO_STDOUT = "enabled"
    RAILS_SERVE_STATIC_FILES = "enabled"
  }
  sensitive_config_vars = {
    RAILS_MASTER_KEY = var.rails_master_key,
  }
}
