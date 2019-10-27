module Types
  class DataURIType < GraphQL::Schema::Scalar
    description 'Represents a formatted data URI.'

    def self.coerce_result(value, _ctx = nil)
      "data:#{value[:type]};base64,#{Base64.encode64(value[:data])}"
    end

    def self.coerce_input(value, _ctx = nil)
      match = value.match(/\Adata:(?<type>(.*));base64,(?<data>(.*))\Z/)
      { type: match[:type], data: Base64.decode64(match[:data]) }
    end
  end
end
