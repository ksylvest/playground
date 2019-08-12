module ControllerAuthHelper
  delegate :authenticate, to: :subject
  delegate :deauthenticate, to: :subject

  def should_be_authenticated
    expect(subject.user).not_to be_nil
  end

  def should_be_deauthenticated
    expect(subject.user).to be_nil
  end
end
