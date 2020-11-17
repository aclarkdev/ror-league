class CreateLeagues < ActiveRecord::Migration[6.0]
  def change
    create_table :leagues do |t|
      t.string :name
      t.st_point :lonlat, geographic: true
      t.timestamps
    end
    add_index :leagues, :lonlat, using: :gist
  end
end
