module Types
  class MutationType < BaseObject
    field :create_league, mutation: Mutations::CreateLeague
  end
end