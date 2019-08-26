module Types
  module Attached
    class ResizeType < GraphQL::Schema::Enum
      graphql_name 'Attached__Resize'

      value 'FIT', value: :fit
      value 'FILL', value: :fill
    end
  end
end
