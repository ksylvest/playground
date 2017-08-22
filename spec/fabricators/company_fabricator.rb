Fabricator(:company) do
  name { sequence { |index| "Company ##{index}" } }
  address
end
