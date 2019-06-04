class Current < ActiveSupport::CurrentAttributes
  attribute :ip
  attribute :session

  def user
    attributes[:session]&.user
  end
end
