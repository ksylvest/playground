require 'rails_helper'

RSpec.describe 'notifications', type: :system do
  let(:user) { create(:user) }
  let!(:welcome_notification) { create(:notification, user: user, message: 'Welcome!') }
  let!(:goodbye_notification) { create(:notification, user: user, message: 'Goodbye!') }

  it 'lets a user manage their notifications' do
    visit notifications_path

    expect(page).to have_text('You must be authenticated to access this.')

    within('form') do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Login')
    end

    expect(page).to have_title('Notifications | Playground')

    within('.title') do
      expect(page).to have_text('Notifications')
    end

    within('.message', text: 'Welcome!') do
      expect(page).to have_text('Welcome!')

      expect(page).to have_button('Read', disabled: false)
      click_button('Read')
      expect(page).to have_button('Read', disabled: true)

      click_button('Clear')
    end

    expect(page).not_to have_selector('.message', text: 'Welcome!')

    within('.message', text: 'Goodbye!') do
      expect(page).to have_text('Goodbye!')

      expect(page).to have_button('Read', disabled: false)
      click_button('Read')
      expect(page).to have_button('Read', disabled: true)

      click_button('Clear')
    end

    expect(page).not_to have_selector('.message', text: 'Goodbye!')

    within('.hero') do
      expect(page).to have_text('Nothing to See')
      expect(page).to have_text('Your Are All Caught up for Notifications')
    end
  end
end
