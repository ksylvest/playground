resource "heroku_domain" "staging" {
  app = heroku_app.staging.name
  hostname = "staging.robotsmakinglove.com"
}

resource "cloudflare_record" "staging" {
  zone_id = var.cloudflare_zone_id
  name = "staging"
  value = "staging-plygnd.herokuapp.com"
  type = "CNAME"
  proxied = true
}
