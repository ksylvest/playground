class MainController < ApplicationController
  def index
    render(component: 'App', props: props, prerender: false)
  end

private

  def props
    {
      location: request.path,
      session: Current.session&.slice(:id),
    }
  end
end
