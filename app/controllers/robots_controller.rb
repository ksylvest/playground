class RobotsController < ApplicationController
  layout "robots"

  def show
    expires_in 5.minutes
  end
end
