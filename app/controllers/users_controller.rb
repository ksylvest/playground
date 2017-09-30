class UsersController < ApplicationController

  before_action :authenticate!, only: %i[edit update]
  before_action :deauthenticate!, only: %i[new create]

  # POST /user
  def create
    @user = User.new(attributes)

    respond_to do |format|
      if @user.save
        authenticate(@user)
        format.json { head :ok }
      else
        format.json { render partial: 'shared/errors', locals: { resource: @user }, status: 422 }
      end
    end
  end

private

  def attributes
    params.require(:user).permit(:name, :email, :password)
  end

end
