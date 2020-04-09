module Types
  class PasswordInput < BaseInputObject
    argument :current, String, required: true
    argument :replacement, String, required: true
  end
end
