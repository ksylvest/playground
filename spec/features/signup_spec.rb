require 'rails_helper'

RSpec.feature 'signup' do
  let(:user) { Fabricate.build(:user) }

  scenario 'submitting with valid credentials' do
    visit root_path
    within('.tabs') do
      click_link('Signup')
    end
    within('.signup') do
      fill_in('Name', with: user.name)
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Signup')
    end
  end

  scenario 'submitting with invalid credentials' do
    visit root_path
    within('.tabs') do
      click_link('Signup')
    end
    within('form') do
      click_button('Signup')
      expect(page).to have_content('')
    end
  end
end
