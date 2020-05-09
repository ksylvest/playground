class AttachmentsController < ApplicationController
  # GET /attached/:id.(jpg|webp)?l=:l&w=:w&resize=(fit|fill)
  def show
    http_cache_forever(public: !params[:fresh]) do
      send_data(service.data, type: Mime::Type.lookup_by_extension(format), disposition: 'inline')
    end
  end

private

  def attachment
    ActiveStorage::Attachment.find(params[:id])
  end

  def service
    Attachment::VariantService.new(
      attachment,
      format: format,
      resize: resize,
      size: size
    )
  end

  def size
    [
      Integer(params.fetch(:w)),
      Integer(params.fetch(:h)),
    ]
  end

  def format
    params.fetch(:format)
  end

  def resize
    params.fetch(:resize)
  end
end
