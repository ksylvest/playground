module ControllerAuthHelper
  delegate :authenticate, to: :subject
  delegate :deauthenticate, to: :subject
end
