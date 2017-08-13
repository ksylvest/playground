json.array! @companies do |company|
  json.call(company, :id, :name)

  json.employees do
    json.array! company.employees do |employee|
      json.call(employee, :id, :name, :email)
    end
  end

  json.address do
    json.call(company.address, :id, :street, :city, :state, :country, :postal)
  end
end
