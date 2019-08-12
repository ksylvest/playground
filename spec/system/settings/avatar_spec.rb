require 'rails_helper'

RSpec.describe 'settings/sessions', type: :system do
  let(:user) { create(:user) }
  let!(:geo_ip) { create(:geo_ip, ip: '4.4.4.4') }
  let!(:session) { create(:session, user: user, ip: '4.4.4.4') }

  scenario 'choosing an avatar' do
    visit settings_avatar_path

    expect(page).to have_text('You must be authenticated to access this.')

    within('form') do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Login')
    end

    expect(page).to have_title('Settings - Avatar | Playground')

    within('.title') do
      expect(page).to have_text('Avatar')
    end

    attach_file('avatar', file_fixture('avatar.svg'), visible: :any)

    expect(page).to have_text('Your avatar has been saved.')

    click_button('Clear')

    within('.modal') do
      expect(page).to have_text('Avatar')
      expect(page).to have_text('Are you sure you want to clear your avatar?')
      expect(page).to have_button('Continue')
      expect(page).to have_button('Cancel')
      click_button('Continue')
    end

    expect(page).to have_text('Your avatar has been reset.')
  end
end
