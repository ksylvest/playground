class Billing::Context
  delegate :id, to: :@user

  def initialize(user:)
    @user = user
  end

  def customer
    @customer ||= Billing::Customer.find_by(user: @user)
  end

end
