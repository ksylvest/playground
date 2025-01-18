require "rails_helper"

RSpec.describe "settings/profile" do
  let(:user) { create(:user) }

  it "lets a user change their profile" do
    visit settings_profile_path
    login(user)

    expect(page).to have_title("Settings - Profile | Playground")

    within(".title") do
      expect(page).to have_text("Profile")
    end

    within("form") do
      fill_in("Email", with: user.email)
      fill_in("Name", with: user.name)
      click_button "Save"
    end

    expect(page).to have_text("Your profile has been saved.")
  end
end
