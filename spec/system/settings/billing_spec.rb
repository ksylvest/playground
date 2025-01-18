require "rails_helper"

RSpec.describe "settings/billing" do
  let(:user) { create(:user) }
  let(:customer) { create(:billing_customer, user:) }

  it "prompts for authentication" do
    visit settings_billing_path
    expect(page).to have_title("Login | Playground")
  end

  it "displays for an authorized user" do
    visit settings_billing_path
    login(user)

    expect(page).to have_title("Settings - Billing | Playground")

    within(".title") do
      expect(page).to have_text("Billing")
    end
  end

  context "when building a source" do
    let(:source) { create(:billing_source, customer:) }

    it "saves a source with a valid number, expiration, and CVC" do
      allow(Billing::BuildSourceService).to receive(:perform!).with({ user:, source: anything }) { source }

      visit settings_billing_path
      login(user)

      click_button("Add a Card")
      within(".modal") do
        expect(page).to have_text("Add a Card")
        expect(page).to have_button("Save")
        expect(page).to have_button("Cancel")
        fill_in_stripe(token: { id: "fake" })
        click_button("Save")
      end

      expect(page).to have_text("•••• 4242 Visa expires 12/3000")
    end
  end

  context "when destroying a source" do
    let!(:source) { create(:billing_source, customer:) }

    it "lets a user destroy a source" do
      allow(Billing::DestroySourceService).to receive(:perform!) { source.destroy! }

      visit settings_billing_path
      login(user)

      within(".table") do
        expect(page).to have_text("•••• 4242 Visa expires 12/3000")
        click_button("Remove")
      end

      within(".modal") do
        expect(page).to have_text("Remove This Card")
        expect(page).to have_text("Are you sure you want to remove this card?")
        expect(page).to have_text("•••• 4242 Visa expires 12/3000")
        expect(page).to have_button("Confirm")
        expect(page).to have_button("Cancel")
        click_button("Confirm")
      end

      expect(page).to have_text('"•••• 4242" is removed.')
    end
  end

  context "when changing the default a source" do
    let!(:source) { create(:billing_source, customer:) }

    it "lets a user change the default source" do
      allow(Billing::DefaultSourceService).to receive(:perform!) { source }

      visit settings_billing_path
      login(user)

      within(".table") do
        expect(page).to have_text("•••• 4242 Visa expires 12/3000")
        click_button("Default")
      end

      within(".modal") do
        expect(page).to have_text("Change Default Card")
        expect(page).to have_text("Are you sure you want to make this your default card?")
        expect(page).to have_text("•••• 4242 Visa expires 12/3000")
        expect(page).to have_button("Confirm")
        expect(page).to have_button("Cancel")
        click_button("Confirm")
      end

      expect(page).to have_text('"•••• 4242" is default.')
    end
  end
end
