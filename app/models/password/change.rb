module Password
  class Change
    include ActiveModel::Model

    INVALID_CURRENT = 'the current password entered does not match our records'.freeze
    INVALID_REPLACEMENT = 'the replacement password entered is not suitable'.freeze
    private_constant :INVALID_CURRENT
    private_constant :INVALID_REPLACEMENT

    validate do
      errors[:current] << INVALID_CURRENT unless @user.authenticate(@current)
      errors[:replacement] << INVALID_REPLACEMENT unless @replacement.present?
    end

    def initialize(current:, replacement:, user:)
      @current = current
      @replacement = replacement
      @user = user
    end

    def save!
      return unless valid?

      @user.password = @replacement
      @user.save!
    end
  end
end
