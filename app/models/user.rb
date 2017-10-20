class User < ApplicationRecord

  has_secure_password validations: false

  has_many :sessions, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: Validation::EMAIL, message: 'is invalid' }
  validates :password, presence: true, length: { in: 8..64 }, unless: -> { password? }

  scope :ordered, -> { order(:id) }

  def self.system
    find_or_create_by!(email: 'info@playground.com') do |user|
      user.name = 'LSSN'
      user.password = 'secret'
    end
  end

  def self.authenticate(params)
    user = find_by(email: params[:email])
    return user if user.authenticate(params[:password])
  end

private

  def password?
    password_digest.present?
  end

end
