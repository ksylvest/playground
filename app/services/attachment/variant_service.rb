module Attachment
  class VariantService
    CONVERTS = %w[jpg heic webp].freeze
    RESIZES = %w[fit fill].freeze
    DEFAULTS = { strip: true }.freeze
    private_constant :CONVERTS
    private_constant :RESIZES
    private_constant :DEFAULTS

    def initialize(attachment:, convert: 'jpg', quality: 90, resize: 'fill', size:)
      raise ArgumentError, "invalid option for convert: #{convert.inspect}" if CONVERTS.none?(convert)
      raise ArgumentError, "invalid option for resize: #{resize.inspect}" if RESIZES.none?(resize)

      @attachment = attachment
      @convert = convert
      @resize = resize
      @quality = quality
      @size = size
    end

    def variant
      @attachment.variant(
        "resize_to_#{@resize}": @size,
        convert: @convert,
        quality: @quality,
        **DEFAULTS
      )
    end
  end
end
