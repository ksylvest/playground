class SitemapsController < ApplicationController
  layout "sitemap"

  def show
    @feed = Feed::Context.new
    @users = User.all

    expires_in 5.minutes
  end
end
