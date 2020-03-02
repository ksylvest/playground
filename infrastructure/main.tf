provider "cloudflare" {
  api_token = var.cloudflare_api_token
}

provider "heroku" {
  email = var.heroku_email
  api_key = var.heroku_api_key
}
