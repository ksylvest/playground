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
  end

  20.times do
  it 'lets a user like and unlike an entry' do
    visit root_path
    expect(page).to have_title('Feed | Playground')

    within('.card') do
      find('button').click
    end

    within('.modal') do
      login(user)
    end

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

  it 'details a feed entry' do
    visit feed_entry_path(entry)
    expect(page).to have_title('Feed - Details | Playground')

    within('.breadcrumb') do
      expect(page).to have_link('Home')
      expect(page).to have_text('Details')
    end

    within('.card') do
      expect(page).to have_text("by #{user.name}")
    end
  end

  it 'lets a user comment on a feed entry' do
    visit feed_entry_path(entry)
    expect(page).to have_title('Feed - Details | Playground')

    fill_in('Add a comment...', with: 'The quick brown fox jumped over the lazy dog.')

    click_button('Comment')

    within('.modal') do
      login(user)
    end

    click_button('Comment')

    within('.media') do
      expect(page).to have_text(user.name)
      expect(page).to have_text('The quick brown fox jumped over the lazy dog.')
    end
  end
end
