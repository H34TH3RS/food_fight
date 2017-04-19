class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.string :food_name
      t.string :class
      t.integer :energy
      t.integer :physical_resistance_debuff
      t.integer :health
      t.integer :accuracy
      t.integer :energy_debuff
      t.integer :strength
      t.integer :accuracy_buff
      t.integer :health_buff
      t.integer :defense
      t.integer :attack_buff
      t.integer :cleanse

      t.timestamps
    end
  end
end
