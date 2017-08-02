class MainController < ApplicationController

  # GET /
  # GET /login
  # GET /signup
  def index
    expires_in 5.minutes
  end

end
