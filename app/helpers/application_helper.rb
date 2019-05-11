module ApplicationHelper
  def viewport
    'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
  end

  def config
    { user: Current.user&.slice(:id, :name) }
  end
end
