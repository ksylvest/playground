class User < ApplicationRecord

  has_secure_password validations: false

  has_many :sessions, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: Validation::EMAIL, message: 'is invalid' }
  validates :password, presence: true, length: { in: 8..64 }, unless: -> { password? }

  scope :ordered, -> { order(:id) }

  def self.system
    find_or_initialize_by(email: 'system@playground.com') do |user|
      user.name = 'System'
      user.password = SecureRandom.hex
    end
  end

private

  def password?
    password_digest.present?
  end

end
