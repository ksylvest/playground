json.array! @addresses do |address|
  json.call(address, :id, :street, :city, :state, :country, :postal)
end
