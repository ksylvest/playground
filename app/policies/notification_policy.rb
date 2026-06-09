# frozen_string_literal: true

class NotificationPolicy < ApplicationPolicy
  class Scope < ApplicationPolicy::Scope
    def resolve
      super.where(user: @user)
    end
  end

  # @return [Boolean]
  def view?
    @record.user.eql?(@user)
  end

  # @return [Boolean]
  def modify?
    @record.user.eql?(@user)
  end
end
