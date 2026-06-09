# frozen_string_literal: true

class ApplicationPolicy
  class Scope
    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      @scope
    end
  end

  # @param user [User]
  # @param record [Object]
  def initialize(user, record)
    @user = user
    @record = record
  end

  # @return [Boolean]
  def view?
    !@user.nil?
  end

  # @return [Boolean]
  def modify?
    !@user.nil?
  end
end
