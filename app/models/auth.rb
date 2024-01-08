class Auth
  include ActiveModel::Model

  attr_accessor :email
  attr_accessor :password

  validates :email, presence: true
  validates :password, presence: true

  def user
    return if invalid?

    user = User.authenticate_by(email: email, password: password)

    errors.add(:base, 'the email and password entered did not match our records') if user.nil?

    user
  end
end
