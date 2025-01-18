require "rails_helper"

RSpec.describe "settings/avatar" do
  let(:user) { create(:user) }
  let!(:geo_ip) { create(:geo_ip, ip: "4.4.4.4") }

  it "lets a user change their avatar" do
    visit settings_avatar_path
    login(user)

    expect(page).to have_title("Settings - Avatar | Playground")

    within(".title") do
      expect(page).to have_text("Avatar")
    end

    attach_file("avatar", file_fixture("photo.png"), visible: :any)

    expect(page).to have_text("Your avatar has been saved.")

    click_button("Clear")

    within(".modal") do
      expect(page).to have_text("Avatar")
      expect(page).to have_text("Are you sure you want to clear your avatar?")
      expect(page).to have_button("Continue")
      expect(page).to have_button("Cancel")
      click_button("Continue")
    end

    expect(page).to have_text("Your avatar has been reset.")
  end
end
