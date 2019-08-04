require 'rails_helper'

RSpec.feature 'login', type: :system do
  let(:user) { create(:user) }

  scenario 'submitting with valid credentials' do
    visit login_path

    expect(page).to have_title('Login | Playground')

    within('form') do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Login')
    end

    expect(page).to have_text('Me')
  end

  scenario 'submitting with invalid credentials' do
    visit login_path
    expect(page).to have_title('Login | Playground')

    within('form') do
      click_button('Login')

      expect(page).to have_text("Email\nCan't be blank.")
      expect(page).to have_text("Password\nCan't be blank.")
    end
  end
end
