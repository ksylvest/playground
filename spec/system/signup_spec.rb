require 'rails_helper'

RSpec.feature 'signup', type: :system do
  let(:user) { Fabricate.build(:user) }

  scenario 'submitting with valid credentials' do
    visit signup_path

    within('form') do
      fill_in('Name', with: user.name)
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Signup')
    end

    expect(page).to have_content('Logout')
  end

  scenario 'submitting with invalid credentials' do
    visit signup_path

    within('form') do
      click_button('Signup')

      expect(page).to have_content("Name can't be blank")
      expect(page).to have_content("Email can't be blank")
      expect(page).to have_content("Password can't be blank")
    end
  end
end
