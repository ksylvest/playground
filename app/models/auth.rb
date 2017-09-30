class Auth
  include ActiveModel::Model

  attr_accessor :email
  attr_accessor :password

  validates :email, presence: true
  validates :email, format: { with: Validation::EMAIL, message: 'must be an email' }, if: -> { email.present? }
  validates :password, presence: true

  validate do
    errors[:base] << 'unable to authenticate' if errors.blank? && !authed?
  end

  def authenticate
    user if valid?
  end

  def authed?
    user&.authenticate(password)
  end

private

  def user
    return @user if defined?(@user)
    @user = User.find_by(email: email)
  end

end
