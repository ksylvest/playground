class AttachmentsController < ApplicationController
  FORMATS = %w[jpg heic webp].freeze
  RESIZES = %w[fit fill].freeze
  private_constant :FORMATS
  private_constant :RESIZES

  # GET /attached/:id.(jpg|png|heic|webp)?l=:l&w=:w&resize=(fit|fill)
  def show
    redirect_to variant.processed.service_url(disposition: params[:disposition])
  end

private

  def attachment
    ActiveStorage::Attachment.find(params[:id])
  end

  def variant
    attachment.variant("resize_to_#{resize}": size, convert: format)
  end

  def size
    [
      w,
      h,
    ]
  end

  def w
    Integer(params.fetch(:w))
  end

  def h
    Integer(params.fetch(:h))
  end

  def format
    format = params.fetch(:format)
    return format if FORMATS.include?(format)

    raise ArgumentError, "invalid option for format: #{format.inspect}"
  end

  def resize
    resize = params.fetch(:resize)
    return resize if RESIZES.include?(resize)

    raise ArgumentError, "invalid option for resize: #{resize.inspect}"
  end
end
