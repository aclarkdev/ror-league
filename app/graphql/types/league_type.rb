module Types
  class LeagueType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :lonlat, String, null: false
    field :price, Integer, null: false
  end
end
