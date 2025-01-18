min_threads_count = Integer(ENV.fetch("RAILS_MIN_THREADS", 4))
max_threads_count = Integer(ENV.fetch("RAILS_MAX_THREADS", 4))
threads min_threads_count, max_threads_count

port ENV.fetch("PORT", 3000)
environment ENV.fetch("RAILS_ENV", "development")
