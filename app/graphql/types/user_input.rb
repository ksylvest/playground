module Types
  class UserInput < BaseInputObject
    argument :name, String, required: true
    argument :email, String, required: true
  end
end
