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

  it 'lets a user like and unlike an entry' do
    visit login_path
    login(user)

    expect(page).to have_title('Feed | Playground')

    within('.card') do
      find('button').click
      within('[title="Unlike"]') do
        expect(page).to have_text('1')
      end
      find('button').click
      within('[title="Like"]') do
        expect(page).to have_text('0')
      end
    end
  end
end
