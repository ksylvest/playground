module ControllerAuthHelper
  def authenticate(user)
    subject.authenticate(user)
  end

  def deauthenticate
    subject.deauthenticate
  end

  def should_authenticate!
    case
    when request.format.html?
      expect(response).to(redirect_to(root_path))
    end

    expect(flash[:alert]).to eql('You must be signed in.')
  end

  def should_deauthenticate!
    case
    when request.format.html?
      expect(response).to redirect_to(root_path)
    end

    expect(flash[:alert]).to eql('You must be signed out.')
  end

  def should_be_authenticated
    expect(subject.user).to_not be_nil
  end

  def should_be_deauthenticated
    expect(subject.user).to be_nil
  end
end
