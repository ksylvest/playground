class AttachmentsController < ApplicationController
  # GET /attached/:id.(jpg|webp)?l=:l&w=:w&resize=(fit|fill)
  def show
    redirect_to rails_representation_url(variant, host: request.host_with_port)
  end

private

  def variant
    Attachment::VariantService.variant(
      ActiveStorage::Attachment.find(params[:id]),
      format: params[:format],
      resize: params[:resize],
      size: [
        Integer(params[:w]),
        Integer(params[:h]),
      ]
    )
  end
end
