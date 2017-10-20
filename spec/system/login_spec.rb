require 'rails_helper'

RSpec.feature 'login', type: :system do
  let(:user) { Fabricate(:user) }

  scenario 'submitting with valid credentials' do
    visit login_path

    within('form') do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Login')
    end
  end

  scenario 'submitting with invalid credentials' do
    visit login_path
    within('form') do
      click_button('Login')

      expect(page).to have_content("Email can't be blank")
      expect(page).to have_content("Password can't be blank")
    end
  end
end
