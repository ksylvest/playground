module SystemAuthHelper
  def authenticate(user)
    visit new_auth_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Login'
  end
end
