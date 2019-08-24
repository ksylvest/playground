# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_26_013409) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pgcrypto"
  enable_extension "plpgsql"

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
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
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

  create_table "billing_plans", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "stripe_id", null: false
    t.uuid "product_id", null: false
    t.integer "amount", null: false
    t.string "currency", null: false
    t.string "interval", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_billing_plans_on_product_id"
    t.index ["stripe_id"], name: "index_billing_plans_on_stripe_id", unique: true
  end

  create_table "billing_products", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "stripe_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_billing_products_on_name", unique: true
    t.index ["stripe_id"], name: "index_billing_products_on_stripe_id", unique: true
  end

  create_table "billing_sources", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "stripe_id", null: false
    t.uuid "customer_id", null: false
    t.boolean "default", default: false, null: false
    t.string "brand", null: false
    t.string "funding", null: false
    t.string "number", null: false
    t.integer "exp_month", null: false
    t.integer "exp_year", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_billing_sources_on_customer_id"
    t.index ["stripe_id"], name: "index_billing_sources_on_stripe_id", unique: true
  end

  create_table "billing_subscriptions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.string "stripe_id", null: false
    t.uuid "customer_id", null: false
    t.uuid "plan_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_billing_subscriptions_on_customer_id"
    t.index ["plan_id"], name: "index_billing_subscriptions_on_plan_id"
    t.index ["stripe_id"], name: "index_billing_subscriptions_on_stripe_id", unique: true
  end

  create_table "feed_entries", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.string "tags", default: [], null: false, array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_feed_entries_on_user_id"
  end

  create_table "feed_likes", force: :cascade do |t|
    t.uuid "user_id", null: false
    t.uuid "entry_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["entry_id"], name: "index_feed_likes_on_entry_id"
    t.index ["user_id", "entry_id"], name: "index_feed_likes_on_user_id_and_entry_id", unique: true
    t.index ["user_id"], name: "index_feed_likes_on_user_id"
  end

  create_table "geo_ips", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.inet "ip", null: false
    t.string "city", null: false
    t.string "region", null: false
    t.string "country", null: false
    t.string "continent", null: false
    t.string "zip", null: false
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

  create_table "sessions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.uuid "user_id", null: false
    t.inet "ip", null: false
    t.string "status", default: "online", null: false
    t.datetime "deleted_at"
    t.datetime "seen_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
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
  add_foreign_key "billing_customers", "users"
  add_foreign_key "billing_plans", "billing_products", column: "product_id"
  add_foreign_key "billing_sources", "billing_customers", column: "customer_id"
  add_foreign_key "billing_subscriptions", "billing_customers", column: "customer_id"
  add_foreign_key "billing_subscriptions", "billing_plans", column: "plan_id"
  add_foreign_key "feed_entries", "users"
  add_foreign_key "feed_likes", "feed_entries", column: "entry_id"
  add_foreign_key "feed_likes", "users"
  add_foreign_key "notifications", "users"
  add_foreign_key "sessions", "users"
end
