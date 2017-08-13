json.call(company, :id, :name)

json.employees do
  json.array! company.employees, partial: 'employees/employee', as: :employee
end

json.address do
  json.call(company.address, :id, :street, :city, :state, :country, :postal)
end
