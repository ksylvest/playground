Fabricator(:session) do
  user
  token { SecureRandom.hex }
  ip '0.0.0.0'
end
