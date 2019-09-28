class AttachmentsController < ApplicationController
  # GET /attached/:id.(jpg|heic|webp)?l=:l&w=:w&resize=(fit|fill)
  def show
    redirect_to variant.service_url(disposition: params[:disposition])
  rescue ArgumentError
    head :unauthorized
  end

private

  def attachment
    ActiveStorage::Attachment.find(params[:id])
  end

  def service
    Attachment::VariantService.new(
      attachment: attachment,
      convert: params.fetch(:format),
      resize: params.fetch(:resize),
      size: [
        Integer(params.fetch(:w)),
        Integer(params.fetch(:h)),
      ]
    )
  end

  def variant
    service.variant.processed
  end
end
