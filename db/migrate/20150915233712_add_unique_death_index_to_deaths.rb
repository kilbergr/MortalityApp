class AddUniqueDeathIndexToDeaths < ActiveRecord::Migration
  def change
  	add_index :deaths, :cause, :unique=>true 
  end
end
