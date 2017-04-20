class RenameClassColumnKlass < ActiveRecord::Migration[5.0]
  def change
    rename_column :cards, :class, :klass
  end
end
