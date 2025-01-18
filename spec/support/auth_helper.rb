module AuthHelper
  def login(user)
    within("form") do
      fill_in("Email", with: user.email)
      fill_in("Password", with: user.password)
      click_button("Login")
    end
  end

  def signup(user)
    within("form") do
      fill_in("Name", with: user.email)
      fill_in("Email", with: user.email)
      fill_in("Password", with: user.password)
      click_button("Login")
    end
  end
end

RSpec.configure do |config|
  config.include AuthHelper, type: :system
end
