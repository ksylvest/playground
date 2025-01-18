module Password
  class Change
    include ActiveModel::Model

    INVALID_CURRENT = "the current password entered does not match our records".freeze
    INVALID_REPLACEMENT = "the replacement password entered is not suitable".freeze
    private_constant :INVALID_CURRENT
    private_constant :INVALID_REPLACEMENT

    # @!attribute current [rw]
    #   @return [String]
    attr_accessor :current

    # @!attribute replacement [rw]
    #   @return [String]
    attr_accessor :replacement

    validate do
      errors.add(:current, :invalid, message: INVALID_CURRENT) unless @user.authenticate(@current)
      errors.add(:replacement, :invalid, message: INVALID_REPLACEMENT) if @replacement.blank?
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
