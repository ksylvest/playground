require 'rails_helper'

RSpec.describe 'settings/billing', type: :system do
  let(:user) { create(:user) }
  let(:customer) { create(:billing_customer, user: user) }

  it 'prompts for authentication' do
    visit settings_billing_path
    expect(page).to have_text('You must be authenticated to access this.')
  end

  it 'displays for an authorized user' do
    visit settings_billing_path
    login(user)

    expect(page).to have_title('Settings - Billing | Playground')

    within('.title') do
      expect(page).to have_text('Billing')
    end
  end

  context 'when building a source' do
    subject(:perform) do
      visit settings_billing_path
      login(user)

      click_button('Add a Card')
      within('.modal') do
        expect(page).to have_text('Add a Card')
        expect(page).to have_button('Save')
        expect(page).to have_button('Cancel')
        fill_in_stripe(token: { id: 'fake' })
        click_button('Save')
      end
    end

    let(:source) { create(:billing_source, customer: customer) }

    it 'saves a source with a valid number, expiration, and CVC' do
      expect(Billing::BuildSourceService).to receive(:perform!).with(user: user, source: 'fake') { source }
      perform
      expect(page).to have_text('•••• 4242 Visa expires 3000-12')
    end
  end

  context 'when destroying a source' do
    let!(:source) { create(:billing_source, customer: customer) }

    it 'lets a user destroy a source' do
      expect(Billing::DestroySourceService).to receive(:perform!) { source.destroy! }

      visit settings_billing_path
      login(user)

      within('.table') do
        expect(page).to have_text('•••• 4242 Visa expires 3000-12')
        click_button('Remove')
      end

      within('.modal') do
        expect(page).to have_text('Remove This Card')
        expect(page).to have_text('Are you sure you want to remove this card?')
        expect(page).to have_text('•••• 4242 Visa expires 3000-12')
        expect(page).to have_button('Confirm')
        expect(page).to have_button('Cancel')
        click_button('Confirm')
      end

      expect(page).to have_text('"•••• 4242" is removed.')
    end
  end

  context 'when changing the default a source' do
    let!(:source) { create(:billing_source, customer: customer) }

    it 'lets a user change the default source' do
      expect(Billing::DefaultSourceService).to receive(:perform!) { source }

      visit settings_billing_path
      login(user)

      within('.table') do
        expect(page).to have_text('•••• 4242 Visa expires 3000-12')
        click_button('Default')
      end

      within('.modal') do
        expect(page).to have_text('Change Default Card')
        expect(page).to have_text('Are you sure you want to make this your default card?')
        expect(page).to have_text('•••• 4242 Visa expires 3000-12')
        expect(page).to have_button('Confirm')
        expect(page).to have_button('Cancel')
        click_button('Confirm')
      end

      expect(page).to have_text('"•••• 4242" is default.')
    end
  end

  context 'when managing subscriptions' do
    let!(:product) { create(:billing_product) }
    let!(:plan_cad_month) { create(:billing_plan, product: product, currency: :cad, amount: 900, interval: :month) }
    let!(:plan_usd_month) { create(:billing_plan, product: product, currency: :usd, amount: 800, interval: :month) }
    let!(:plan_cad_year) { create(:billing_plan, product: product, currency: :cad, amount: 9000, interval: :year) }
    let!(:plan_usd_year) { create(:billing_plan, product: product, currency: :usd, amount: 8000, interval: :year) }

    it 'lets a user manage a subscription' do
      visit settings_billing_path
      login(user)

      click_link('EUR')

      within('.card', text: 'Student') do
        expect(page).to have_text('Unavailable')
      end

      click_link('CAD')

      within('.card', text: 'Student') do
        expect(page).to have_text('$9.00 / month')
        expect(page).to have_text('$90.00 / year')
      end

      click_link('USD')

      within('.card', text: 'Student') do
        expect(page).to have_text('$8.00 / month')
        expect(page).to have_text('$80.00 / year')
      end
    end
  end
end
