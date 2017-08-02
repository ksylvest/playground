class API::AuthsController < ApplicationController
  wrap_parameters :auth, include: %i[email password]

  # POST /api/auth
  def create
    @auth = Auth.new(attributes)
    @user = @auth.authenticate

    if @user
      authenticate(@user)
      head :ok
    else
      render partial: 'api/shared/errors', locals: { resource: @auth }, status: 422
    end
  end

  # DELETE /api/auth
  def destroy
    deauthenticate
    head 204
  end

private

  def attributes
    params.require(:auth).permit(:email, :password)
  end

end
