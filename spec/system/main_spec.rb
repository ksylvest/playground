require 'rails_helper'

RSpec.feature 'main', type: :system do
  let(:user) { Fabricate(:user) }

  scenario 'visiting home' do
    visit root_path

    expect(page).to have_contet('Howdy!')
  end
end
