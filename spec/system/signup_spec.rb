require "rails_helper"

RSpec.describe "signup" do
  let(:user) { build(:user) }

  it "submits with valid credentials" do
    visit signup_path

    expect(page).to have_title("Signup | Playground")

    within("form") do
      fill_in("Name", with: user.name)
      fill_in("Email", with: user.email)
      fill_in("Password", with: user.password)
      click_button("Signup")
    end

    expect(page).to have_text("Me")
  end

  it "errors with invalid credentials" do
    visit signup_path

    expect(page).to have_title("Signup | Playground")

    within("form") do
      click_button("Signup")

      expect(page).to have_text("Name\nCan't be blank.")
      expect(page).to have_text("Email\nCan't be blank.")
      expect(page).to have_text("Password\nCan't be blank.")
    end
  end
end
