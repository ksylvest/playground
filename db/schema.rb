# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_07_06_033502) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "billing_source_brand", ["American Express", "Diners Club", "Discover", "JCB", "MasterCard", "UnionPay", "Visa", "Unknown"]
  create_enum "billing_source_funding", ["credit", "debit", "prepaid", "unknown"]

  create_table "active_storage_attachments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.uuid "record_id", null: false
    t.string "record_type", null: false
    t.uuid "blob_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "blob_id", null: false
    t.string "variation_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "authentications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.inet "ip", null: false
    t.string "status", default: "online", null: false
    t.datetime "deleted_at"
    t.datetime "seen_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_authentications_on_user_id"
  end

  create_table "billing_customers", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "stripe_id", null: false
    t.uuid "user_id", null: false
    t.string "currency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["stripe_id"], name: "index_billing_customers_on_stripe_id", unique: true
    t.index ["user_id"], name: "index_billing_customers_on_user_id", unique: true
  end

  create_table "billing_sources", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "stripe_id", null: false
    t.uuid "customer_id", null: false
    t.boolean "default", default: false, null: false
    t.enum "brand", null: false, enum_type: "billing_source_brand"
    t.enum "funding", null: false, enum_type: "billing_source_funding"
    t.string "number", null: false
    t.integer "exp_month", null: false
    t.integer "exp_year", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_billing_sources_on_customer_id"
    t.index ["stripe_id"], name: "index_billing_sources_on_stripe_id", unique: true
  end

  create_table "feed_comments", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "entry_id", null: false
    t.string "message", null: false
    t.datetime "sent_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entry_id"], name: "index_feed_comments_on_entry_id"
    t.index ["user_id"], name: "index_feed_comments_on_user_id"
  end

  create_table "feed_entries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.string "tags", default: [], null: false, array: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_feed_entries_on_user_id"
  end

  create_table "feed_likes", force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "entry_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["entry_id"], name: "index_feed_likes_on_entry_id"
    t.index ["user_id", "entry_id"], name: "index_feed_likes_on_user_id_and_entry_id", unique: true
    t.index ["user_id"], name: "index_feed_likes_on_user_id"
  end

  create_table "follows", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "followed_id", null: false
    t.uuid "follower_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followed_id", "follower_id"], name: "index_follows_on_followed_id_and_follower_id", unique: true
    t.index ["followed_id"], name: "index_follows_on_followed_id"
    t.index ["follower_id"], name: "index_follows_on_follower_id"
  end

  create_table "geo_ips", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.inet "ip", null: false
    t.string "city", null: false
    t.string "region", null: false
    t.string "country", null: false
    t.string "continent", null: false
    t.string "postal", null: false
    t.decimal "latitude", null: false
    t.decimal "longitude", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ip"], name: "index_geo_ips_on_ip", unique: true
  end

  create_table "notifications", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.text "message", null: false
    t.datetime "read_at"
    t.datetime "deleted_at"
    t.datetime "sent_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_notifications_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.string "password_digest"
    t.datetime "deleted_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "authentications", "users"
  add_foreign_key "billing_customers", "users"
  add_foreign_key "billing_sources", "billing_customers", column: "customer_id"
  add_foreign_key "feed_comments", "feed_entries", column: "entry_id"
  add_foreign_key "feed_comments", "users"
  add_foreign_key "feed_entries", "users"
  add_foreign_key "feed_likes", "feed_entries", column: "entry_id"
  add_foreign_key "feed_likes", "users"
  add_foreign_key "follows", "users", column: "followed_id"
  add_foreign_key "follows", "users", column: "follower_id"
  add_foreign_key "notifications", "users"
end
