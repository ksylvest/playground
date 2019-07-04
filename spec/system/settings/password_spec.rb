require 'rails_helper'

RSpec.feature 'settings/password', type: :system do
  let(:user) { Fabricate(:user) }
  let(:current) { user.password }
  let(:replacement) { SecureRandom.alphanumeric }

  scenario 'changing passwords' do
    visit settings_password_path

    expect(page).to have_text('You must be authenticated to access this.')

    within('form') do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Login')
    end

    within('.title') do
      expect(page).to have_text('Password')
    end

    within('form') do
      click_button('Change')
      expect(page).to have_text('The current password entered does not match our records.')
      expect(page).to have_text('The replacement password entered is not suitable.')
    end

    within('form') do
      fill_in('Current', with: current)
      fill_in('Replacement', with: replacement)
      click_button 'Change'
    end

    expect(page).to have_text('Your password has been saved.')
  end
end
