# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20150916001844) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "deaths", force: :cascade do |t|
    t.string "cause"
  end

  add_index "deaths", ["cause"], name: "index_deaths_on_cause", unique: true, using: :btree

  create_table "demographics", force: :cascade do |t|
    t.string  "state"
    t.string  "age"
    t.integer "year"
    t.string  "sex"
    t.string  "race"
    t.string  "ethnicity"
  end

  add_index "demographics", ["state", "age", "race", "ethnicity", "sex", "year"], name: "dem_index", unique: true, using: :btree

  create_table "figures", force: :cascade do |t|
    t.integer "number"
    t.float   "percent"
    t.integer "death_id"
    t.integer "demographic_id"
  end

  add_index "figures", ["death_id"], name: "index_figures_on_death_id", using: :btree
  add_index "figures", ["demographic_id"], name: "index_figures_on_demographic_id", using: :btree

  add_foreign_key "figures", "deaths"
  add_foreign_key "figures", "demographics"
end
