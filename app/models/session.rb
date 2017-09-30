class Session < ApplicationRecord
  belongs_to :user

  after_initialize do
    self.token = SecureRandom.hex
  end
end
