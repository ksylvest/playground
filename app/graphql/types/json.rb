module Types
  class JSON < GraphQL::Schema::Scalar
    description 'Raw JSON'

    def self.coerce_input(value, _context)
      value
    end

    def self.coerce_result(value, _context)
      value
    end
  end
end
