module Types
  class DateType < GraphQL::Schema::Scalar
    description 'An ISO date'

    def self.coerce_result(value, _ctx)
      value.iso8601
    end

    def self.coerce_input(value, _ctx)
      Date.iso8601(value)
    rescue ArgumentError
      nil
    end
  end
end
