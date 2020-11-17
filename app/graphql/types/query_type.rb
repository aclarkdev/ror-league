module Types
  class QueryType < Types::BaseObject
    field :all_leagues, [LeagueType], null: false

    def all_leagues
      League.all
    end

    field :within_range, [LeagueType], null: false do
      argument :lat, String, required: true
      argument :lon, String, required: true
      argument :radius, Integer, required: true
      argument :budget, Integer, required: true
    end

    def within_range(lat:, lon:, radius:, budget:)
      # get leagues within longitude/latitude radius and sort by price
      leaguesInRadius = League.within(lat, lon, radius).sort_by(&:price)
      sum = 0
      count = 0
      for league in leaguesInRadius do
        sum = sum + league.price;

        if (budget < sum)
          break;
        else
          count += 1
        end
      end
  
      leaguesInRadius.take(count)
    end
  end
end