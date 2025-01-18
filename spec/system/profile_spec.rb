require "rails_helper"

RSpec.describe "feed" do
  let(:user) { create(:user, :with_avatar) }
  let!(:entry) { create(:feed_entry, :with_photos, user:) }

  it "lets a user follow and unfollow a profile" do
    visit profile_path(user)
    expect(page).to have_title("Profile | Playground")
    expect(page).to have_text(user.name)

    click_button("Follow")

    within(".modal") do
      login(user)
    end

    click_button("Follow")
    expect(page).to have_button("Following")
    click_button("Following")
    expect(page).to have_button("Follow")
  end

  it "lists feed entries" do
    visit profile_path(user)
    expect(page).to have_title("Profile | Playground")

    within(".card") do
      expect(page).to have_css(".card-image")
      expect(page).to have_css(".card-content")
    end
  end
end
