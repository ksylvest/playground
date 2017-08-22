Fabricator(:employee) do
  name { sequence { |index| "Employee ##{index}" } }
  email { sequence { |index| "employee-#{index}@sample.domain" } }
  company
end
