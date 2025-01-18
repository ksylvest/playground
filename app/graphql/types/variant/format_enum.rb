module Types
  module Variant
    class FormatEnum < BaseEnum
      graphql_name "Variant__Format"

      value "JPEG", value: "jpeg"
      value "WEBP", value: "webp"
    end
  end
end
