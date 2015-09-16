class ChangeIntegerToFloatForFigures < ActiveRecord::Migration
  def change
  	change_column :figures, :percent, :float
  end
end
