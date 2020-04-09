module Types
  class AttachedType < BaseObject
    field :id, String, null: false
    field :filename, String, null: false
    field :variant, DataURIType, null: true do
      argument :options, VariantInput, required: true
    end

    def variant(options:)
      service = Attachment::VariantService.new(object, options.parameterize)
      ::Loaders::CacheLoader.for.load(key: service.key, value: -> { service.data }).then do |data|
        { data: data, type: service.type }
      end
    end
  end
end
