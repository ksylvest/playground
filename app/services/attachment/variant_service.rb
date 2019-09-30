module Attachment
  class VariantService
    FORMATS = %w[jpeg heic heif webp].freeze
    RESIZES = %w[fit fill].freeze
    DEFAULTS = { strip: true }.freeze
    private_constant :FORMATS
    private_constant :RESIZES
    private_constant :DEFAULTS

    def initialize(attachment:, format: 'jpg', quality: 90, resize: 'fill', size:)
      raise ArgumentError, "invalid option for format: #{format.inspect}" if FORMATS.none?(format)
      raise ArgumentError, "invalid option for resize: #{resize.inspect}" if RESIZES.none?(resize)

      @attachment = attachment
      @format = format
      @resize = resize
      @quality = quality
      @size = size
    end

    def data
      variant.processed
      variant.service.download(variant.key)
    end

    def variant
      @variant ||= @attachment.variant(
        "resize_to_#{@resize}": @size,
        convert: @format,
        quality: @quality,
        **DEFAULTS
      )
    end
  end
end
