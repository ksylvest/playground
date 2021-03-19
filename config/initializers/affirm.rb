require 'affirm'

Affirm.config.private_api_key = Rails.application.credentials.affirm_private_api_key
Affirm.config.public_api_key = Rails.application.credentials.affirm_public_api_key
