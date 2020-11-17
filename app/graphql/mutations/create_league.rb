module Mutations
  class CreateLeague < BaseMutation
    argument :name, String, required: true
    argument :lonlat, String, required: true
    argument :price, Integer, required: true

    type Types::LeagueType

    def resolve(name: nil, lonlat: nil, price: nil)
      League.create!(
        name: name,
        lonlat: lonlat,
        price: price
      )
    end
  end
end