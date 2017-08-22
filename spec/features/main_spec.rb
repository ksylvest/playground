require 'rails_helper'

RSpec.feature 'visiting home' do
  scenario 'someone visiting home' do
    visit root_path
    expect(page).to have_content('Welcome')
  end
end
