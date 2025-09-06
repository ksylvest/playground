class Billing::Context
  def initialize(user:)
    @user = user
  end

  def customer
    return @customer if defined?(@customer)

    @customer = Billing::Customer.find_by(user: @user)
  end

  delegate :id, to: :@user
end
