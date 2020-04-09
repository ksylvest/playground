module Types
  class NotificationType < BaseObject
    field :id, ID, null: false
    field :message, String, null: false
    field :read, Boolean, null: false, method: :read_at?
    field :deleted, Boolean, null: false, method: :deleted_at?
    field :sent, DateTimeType, null: false, method: :sent_at
  end
end
