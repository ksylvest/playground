module Types
  module Variant
    class ResizeEnum < GraphQL::Schema::Enum
      graphql_name 'Variant__Resize'

      value 'FIT', value: 'fit'
      value 'FILL', value: 'fill'
    end
  end
end
