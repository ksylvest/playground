class User < ApplicationRecord
  has_secure_password validations: false

  has_many :sessions, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true, if: -> { email.present? }
  validates :email, format: { with: Validation::EMAIL, message: 'is invalid' }, if: -> { email.present? }
  validates :password, presence: true, unless: -> { passworded? }

  scope :ordered, -> { order(:id) }

  def self.system
    find_or_initialize_by(email: 'system@playground.dev') do |user|
      user.name = 'System'
      user.password = SecureRandom.hex
    end
  end

private

  def passworded?
    password_digest.present?
  end

end
