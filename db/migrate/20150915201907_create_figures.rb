class CreateFigures < ActiveRecord::Migration
  def change
    create_table :figures do |t|
      t.integer :number
      t.integer :percent
      t.references :death, index: true, foreign_key: true
      t.references :demographic, index: true, foreign_key: true

    end
  end
end
