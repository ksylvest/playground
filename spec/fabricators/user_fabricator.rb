Fabricator(:user) do
  name { 'Kevin Sylvestre' }
  email { Fabricate.sequence(:email) { |index| "user#{index}@playground.dev" } }
  password { 'secret' }
end
