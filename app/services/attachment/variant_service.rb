module Attachment
  class VariantService
    FORMATS = %w[jpeg webp].freeze
    RESIZES = %w[fit fill].freeze
    DEFAULTS = { strip: true }.freeze
    private_constant :FORMATS
    private_constant :RESIZES
    private_constant :DEFAULTS

    delegate :key, to: :variant

    # @param attachment [ActiveStorage::Attachment] an attachment to generate a variant for
    # @param format [String] 'jpeg' or 'webp'
    # @param resize [String] 'fit' or 'fill'
    # @param quality [Integer] a numeric quality option ranging from 0 to 100
    # @param size [Array] a l / w tuple
    def initialize(attachment, size:, format: 'jpeg', quality: 80, resize: 'fill')
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
      @variant ||= @attachment.variant(
        "resize_to_#{@resize}": @size,
        convert: @format,
        quality: @quality,
        **DEFAULTS
      )
    end

    # @return [String] the processed data for the variant
    def data
      variant.processed
      variant.service.download(key)
    end

    # @return [String] a mime type (i.e. image/jpeg or image/webp)
    def type
      Mime::Type.lookup_by_extension(@format)
    end
  end
end
