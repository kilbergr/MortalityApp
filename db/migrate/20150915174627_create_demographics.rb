class CreateDemographics < ActiveRecord::Migration
  def change
    create_table :demographics do |t|

      t.string :state
      t.string :age
      t.integer :year
      t.string :sex
      t.string :race
      t.string :ethnicity

    end
  end
end
