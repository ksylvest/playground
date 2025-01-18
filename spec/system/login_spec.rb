require "rails_helper"

RSpec.describe "login" do
  let(:user) { create(:user) }

  it "submits with valid credentials" do
    visit login_path
    expect(page).to have_title("Login | Playground")

    within("form") do
      fill_in("Email", with: user.email)
      fill_in("Password", with: user.password)
      click_button("Login")
    end

    expect(page).to have_text("Me")
  end

  it "errors with invalid credentials" do
    visit login_path
    expect(page).to have_title("Login | Playground")

    within("form") do
      click_button("Login")

      expect(page).to have_text("Email\nCan't be blank.")
      expect(page).to have_text("Password\nCan't be blank.")
    end
  end
end
