class AddPriceToLeague < ActiveRecord::Migration[6.0]
  def change
    add_column :leagues, :price, :integer
  end
end
