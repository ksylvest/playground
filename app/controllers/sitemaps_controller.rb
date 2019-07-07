class SitemapsController < ApplicationController
  layout 'sitemap'

  def show
    expires_in 5.minutes
  end
end
