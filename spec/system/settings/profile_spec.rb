require 'rails_helper'

RSpec.feature 'settings/profile', type: :system do
  let(:user) { Fabricate(:user) }

  scenario 'changing a profile' do
    visit settings_profile_path

    expect(page).to have_text('You must be authenticated to access this.')

    within('form') do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Login')
    end

    expect(page).to have_title('Settings - Profile | Playground')

    within('.title') do
      expect(page).to have_text('Profile')
    end

    within('form') do
      fill_in('Email', with: user.email)
      fill_in('Name', with: user.name)
      click_button 'Save'
    end

    expect(page).to have_text('Your profile has been saved.')
  end
end
