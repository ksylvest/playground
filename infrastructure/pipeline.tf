resource "heroku_pipeline" "pipeline" {
  name = "plygnd"
}

resource "heroku_pipeline_coupling" "staging" {
  app = heroku_app.staging.name
  pipeline = heroku_pipeline.pipeline.id
  stage = "staging"
}
