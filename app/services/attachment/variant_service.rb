module Attachment
  class VariantService
    module Format
      AVIF = "avif".freeze
      JPEG = "jpeg".freeze
      WEBP = "webp".freeze
    end

    module Resize
      FIT = "fit".freeze
      FILL = "fill".freeze
    end

    FORMATS = [
      Format::AVIF,
      Format::JPEG,
      Format::WEBP,
    ].freeze

    RESIZES = [
      Resize::FIT,
      Resize::FILL,
    ].freeze

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

    # @return [ActiveStorage::VariantWithRecord]
    def variant
      return @attachment.blob if Rails.env.test?

      @attachment.variant(
        "resize_to_#{@resize}": @size,
        format: @format,
        saver: DEFAULTS.merge({ quality: @quality })
      )..processed
    end
  end
end
