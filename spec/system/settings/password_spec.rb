require "rails_helper"

RSpec.describe "settings/password" do
  let(:user) { create(:user) }
  let(:current) { user.password }
  let(:replacement) { SecureRandom.alphanumeric }

  it "lets a user change their password" do
    visit settings_password_path
    login(user)

    expect(page).to have_title("Settings - Password | Playground")

    within(".title") do
      expect(page).to have_text("Password")
    end

    within("form") do
      click_button("Change")
      expect(page).to have_text("The current password entered does not match our records.")
      expect(page).to have_text("The replacement password entered is not suitable.")
    end

    within("form") do
      fill_in("Current", with: current)
      fill_in("Replacement", with: replacement)
      click_button "Change"
    end

    expect(page).to have_text("Your password has been saved.")
  end
end
