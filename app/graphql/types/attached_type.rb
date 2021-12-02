module Types
  class AttachedType < BaseObject
    field :id, String, null: false
    field :filename, String, null: false
    field :variant, DataURIType, null: true do
      argument :options, VariantInput, required: true
    end

    def variant(options:)
      service = Attachment::VariantService.new(object, **options.parameterize)
      data = dataloader.with(Sources::Cache).load(key: service.key, value: -> { service.data })

      { data: data, type: service.type }
    end
  end
end
