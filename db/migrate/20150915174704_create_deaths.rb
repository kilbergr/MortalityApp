class CreateDeaths < ActiveRecord::Migration
  def change
    create_table :deaths do |t|

      t.string :cause
      
    end
  end
end
