class UsersController < ApplicationController
  wrap_parameters :user, include: %i[name email password]

  # POST /user
  def create
    @user = User.new(attributes)

    if @user.save
      authenticate(@user)
      head :ok
    else
      render partial: 'shared/errors', locals: { resource: @user }, status: 422
    end
  end

private

  def attributes
    params.require(:user).permit(:name, :email, :password)
  end

end
