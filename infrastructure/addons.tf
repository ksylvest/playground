resource "heroku_addon" "database" {
  app = heroku_app.staging.name
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_addon" "cache" {
  app = heroku_app.staging.name
  plan = "heroku-redis:hobby-dev"
}

resource "heroku_addon_attachment" "cache" {
  app_id = heroku_app.staging.id
  addon_id = heroku_addon.cache.id
  name = "CACHE"
}
