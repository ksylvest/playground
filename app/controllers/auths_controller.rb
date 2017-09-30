class AuthsController < ApplicationController
  wrap_parameters :auth, include: %i[email password]

  before_action :deauthenticate!, only: %i[new create]
  before_action :authenticate!, only: %i[destroy]

  # POST /auth
  def create
    @auth = Auth.new(attributes)
    @user = @auth.authenticate

    respond_to do |format|
      if @user
        authenticate(@user)
        format.json { head :ok }
      else
        format.json { render partial: 'shared/errors', locals: { resource: @auth }, status: 422 }
      end
    end
  end

  # DELETE /auth
  def destroy
    deauthenticate

    respond_to do |format|
      format.json { head :ok }
    end
  end

private

  def attributes
    params.require(:auth).permit(:email, :password)
  end

end
