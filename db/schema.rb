# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170428145502) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "card_assignments", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "card_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "expires_at"
    t.index ["card_id"], name: "index_card_assignments_on_card_id", using: :btree
    t.index ["user_id"], name: "index_card_assignments_on_user_id", using: :btree
  end

  create_table "cards", force: :cascade do |t|
    t.string   "food_name"
    t.string   "klass"
    t.integer  "energy"
    t.integer  "physical_resistance_debuff"
    t.integer  "health"
    t.integer  "accuracy"
    t.integer  "energy_debuff"
    t.integer  "strength"
    t.integer  "accuracy_buff"
    t.integer  "health_buff"
    t.integer  "defense"
    t.integer  "attack_buff"
    t.integer  "cleanse"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.string   "upc"
    t.jsonb    "nutrition_data"
    t.integer  "salt"
    t.index ["upc"], name: "index_cards_on_upc", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.string   "auth_token"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["email"], name: "index_users_on_email", using: :btree
  end

  add_foreign_key "card_assignments", "cards"
  add_foreign_key "card_assignments", "users"
end
