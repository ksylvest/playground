Rails.application.config.filter_parameters += %i[
  passw email secret token _key crypt salt certificate otp ssn cvv cvc
]

Mime::Type.register("image/webp", :webp)
