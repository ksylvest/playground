class AuthsController < ApplicationController
  wrap_parameters :auth, include: %i[email password]

  # POST /auth
  def create
    @auth = Auth.new(attributes)
    @user = @auth.authenticate

    if @user
      authenticate(@user)
      head 201
    else
      render partial: 'shared/errors', locals: { resource: @auth }, status: 422
    end
  end

  # DELETE /auth
  def destroy
    deauthenticate
    head 204
  end

private

  def attributes
    params.require(:auth).permit(:email, :password)
  end

end
