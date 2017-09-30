require 'rails_helper'

RSpec.feature 'login' do
  let(:user) { Fabricate(:user) }

  scenario 'submitting with valid credentials' do
    visit root_path
    within('.tabs') do
      click_link('Login')
    end
    within('.login') do
      fill_in('Email', with: user.email)
      fill_in('Password', with: user.password)
      click_button('Login')
    end
  end

  scenario 'submitting with invalid credentials' do
    visit root_path
    within('.tabs') do
      click_link('Login')
    end
    within('form') do
      click_button('Login')
    end
  end
end
