Rails.application.config.filter_parameters += %i[
  passw secret token _key crypt salt certificate otp ssn
]

Mime::Type.register('image/webp', :webp)
