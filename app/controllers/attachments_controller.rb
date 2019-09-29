class AttachmentsController < ApplicationController
  # GET /attached/:id.(jpg|webp)?l=:l&w=:w&resize=(fit|fill)
  def show
    expires_in 2.years, public: !params[:fresh]
    send_data(service.data, type: format, disposition: 'inline')
  end

private

  def attachment
    ActiveStorage::Attachment.find(params[:id])
  end

  def service
    Attachment::VariantService.new(
      attachment: attachment,
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
