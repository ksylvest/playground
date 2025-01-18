class Auth
  include ActiveModel::Model

  # @!attribute email [rw]
  #   @return [String]
  attr_accessor :email

  # @!attribute password [rw]
  #   @return [String]
  attr_accessor :password

  validates :email, presence: true
  validates :password, presence: true

  def user
    return if invalid?

    user = User.authenticate_by(email:, password:)

    errors.add(:base, "the email and password entered did not match our records") if user.nil?

    user
  end
end
