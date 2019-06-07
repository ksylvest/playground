require 'rails_helper'

RSpec.feature 'settings/sessions', type: :system do
  let(:user) { Fabricate(:user) }
  let!(:geo_ip) { Fabricate(:geo_ip, ip: '4.4.4.4') }
  let!(:session) { Fabricate(:session, user: user, ip: '4.4.4.4') }

  scenario 'managing sessions' do
    visit settings_sessions_path

    expect(page).to have_text('You must be authenticated to access this.')

    within('form') do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Login')
    end

    within('.title') do
      expect(page).to have_text('Sessions')
    end

    expect(page).to have_text('This is a listing of clients that can access your account.')
    expect(page).to have_text('Revoke any sessions that you do not recognize or trust.')

    within('.table') do
      expect(page).to have_text('4.4.4.4')
      expect(page).to have_text('New York')
      expect(page).to have_text('Saratoga Springs')
      expect(page).to have_text('United States')
      click_button 'Revoke'
    end

    within('.modal') do
      expect(page).to have_text('Are you sure you want to revoke this session?')
      expect(page).to have_text('4.4.4.4')
      expect(page).to have_text('Devices using this session will be need to re-authenticate.')
      click_button 'Continue'
    end

    expect(page).to have_text('The session "4.4.4.4" is revoked.')

    within('.table') do
      expect(page).to_not have_text('4.4.4.4')
    end
  end
end
