require "rails_helper"

RSpec.describe "settings/authentications" do
  let(:user) { create(:user) }
  let!(:geo_ip) { create(:geo_ip, ip: "4.4.4.4") }
  let!(:authentication) { create(:authentication, user:, ip: "4.4.4.4") }

  it "lets a user manage their authentications" do
    visit settings_authentications_path
    login(user)

    expect(page).to have_title("Settings - Authentications | Playground")

    within(".title") do
      expect(page).to have_text("Authentications")
    end

    expect(page).to have_text("This is a listing of clients that can access your account.")
    expect(page).to have_text("Revoke any authentications that you do not recognize or trust.")

    within(".message", text: "4.4.4.4") do
      expect(page).to have_text("4.4.4.4")
      expect(page).to have_text("New York")
      expect(page).to have_text("Saratoga Springs")
      expect(page).to have_text("United States")
      click_button "Revoke"
    end

    within(".modal") do
      expect(page).to have_text("Are you sure you want to revoke this authentication?")
      expect(page).to have_text("4.4.4.4")
      expect(page).to have_text("Devices using this authentication will be need to re-authenticate.")
      click_button "Continue"
    end

    expect(page).to have_text('The authentication "4.4.4.4" is revoked.')

    expect(page).to have_no_css(".message", text: "4.4.4.4")
  end
end
