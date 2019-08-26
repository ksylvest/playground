module Types
  module Attached
    class FormatType < GraphQL::Schema::Enum
      graphql_name 'Attached__Format'

      value 'JPG', value: 'jpg'
      value 'PNG', value: 'png'
      value 'HEIC', value: 'heic'
      value 'WEBP', value: 'webp'
    end
  end
end
