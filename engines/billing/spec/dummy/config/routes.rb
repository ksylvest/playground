Rails.application.routes.draw do
  mount Billing::Engine, at: '/billing'
end
