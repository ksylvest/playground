require 'rails_helper'

RSpec.feature 'notifications', type: :system do
  let(:user) { Fabricate(:user) }
  let!(:notification) { Fabricate(:notification, user: user) }

  scenario 'managing sessions' do
    visit notifications_path

    expect(page).to have_text('You must be authenticated to access this.')

    within('form') do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Login')
    end

    expect(page).to have_text('Notifications')

    within('.message') do
      expect(page).to have_text(notification.message)

      expect(page).to have_button('Read', disabled: false)
      click_button('Read')
      expect(page).to have_button('Read', disabled: true)

      click_button('Clear')
    end

    expect(page).to_not have_selector('.message')
  end
end
