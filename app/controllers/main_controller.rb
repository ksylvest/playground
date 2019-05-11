class MainController < ApplicationController
  def index
    expires_in 5.minutes
  end
end
