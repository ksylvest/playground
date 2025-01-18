module Attachment
  class VariantService
    FORMATS = %w[avif jpeg webp].freeze
    RESIZES = %w[fit fill].freeze
    DEFAULTS = { strip: true }.freeze
    private_constant :FORMATS
    private_constant :RESIZES
    private_constant :DEFAULTS

    def self.variant(...)
      new(...).variant
    end

    # @param attachment [ActiveStorage::Attachment] an attachment to generate a variant for
    # @param format [String] 'avif' / 'jpeg' / 'webp'
    # @param resize [String] 'fit' / 'fill'
    # @param quality [Integer] a numeric quality option ranging from 0 to 100
    # @param size [Array] a w / h tuple
    def initialize(attachment, size:, format: "jpeg", quality: 80, resize: "fill")
      raise ArgumentError, "invalid option for format: #{format.inspect}" if FORMATS.none?(format)
      raise ArgumentError, "invalid option for resize: #{resize.inspect}" if RESIZES.none?(resize)

      @attachment = attachment
      @format = format
      @resize = resize
      @quality = quality
      @size = size
    end

    # @return [ActiveStorage::Variant] a memoized variant
    def variant
      @attachment.variant(
        "resize_to_#{@resize}": @size,
        format: @format,
        saver: DEFAULTS.merge({ quality: @quality })
      )
    end
  end
end
