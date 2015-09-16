class AddUniqueDemographicsIndexToDemographics < ActiveRecord::Migration
  def change
  	add_index :demographics, [:state, :age, :race, :ethnicity, :sex, :year], :unique=>true, :name=>'dem_index'
  end
end
