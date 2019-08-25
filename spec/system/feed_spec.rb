require 'rails_helper'

RSpec.describe 'feed', type: :system do
  let(:user) { create(:user, :with_avatar) }
  let!(:entry) { create(:feed_entry, :with_photos, user: user) }

  it 'lists feed entries' do
    visit root_path
    expect(page).to have_title('Feed | Playground')

    within('.card') do
      expect(page).to have_css('.card-image')
      expect(page).to have_css('.card-content')
      expect(page).to have_text(user.name)
      find('.card-image').click
    end

    within('.modal') do
      expect(page).to have_css('img')
      expect(page).to have_css('.modal-background')
      expect(page).to have_css('.modal-content')
      find('.modal-close').click
    end
  end
end
