class Session < ApplicationRecord
  ALGORITHM = 'HS256'.freeze

  belongs_to :user

  after_initialize do
    self.token = SecureRandom.hex
  end

  def self.encode(payload, algorithm: ALGORITHM)
    JWT.encode(payload, Rails.application.secrets.secret_key_base, algorithm)
  end

  def self.decode(payload, algorithm: ALGORITHM)
    result, = JWT.decode(payload, Rails.application.secrets.secret_key_base, algorithm, algorithm: algorithm)
    result
  end
end
