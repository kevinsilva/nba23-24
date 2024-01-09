# BRIDGE IN NBA

## Structure

- 3 main sections: Header, Navigation, Main

## Features

- list all teams
- show a team roster
- stats of a player
- list all games
- stats from any game of given team (EXTRA)

## notes

A single page app that allows users to view NBA team rosters with stats from platers and games.

main ideas:

- The home page should list all teams.
- Clicking on a team shows the inherent team roster.
- Clicking on a player shows the inherent player stats.
- Clicking on games shows list of games.
- Clicking on a specific game shows inherent stats.

navigation:

- Home (teams)
- Roster
- Games

feature for better UX: filtering.

- every page should include a filtering input
  _filter by_
- Home: team name
- Roster: player name
- Games: team name

### Home

- Displays all teams.
- Displays navigation with active home/teams.
- A input text field filters by team's name.
- If name does not correspond -> show no team available with that name.
- Clicking on a team redirects to ROSTER.

{JSON.stringify(teams, null, 2)}

### Roster

- Displays selected team or pre-defined team.
- Displays navigation with active roster.
- An input text field filters by player's name.
- If name does not correspond -> show no player available with that name
- Clicking on a player redirects to STATS.

**problem:**
API fetches all players from all seasons without filtering params except for player's name.

**solutions**

IDEA 1 - Show All Time Roster.
REVIEW 1 - No info on season rosters = Confusing for UX + Lots of Requests. Could reduce requests by using pagination, but still bad UX.

IDEA 2 - Fetch Last Match for given team -> grab match ID -> fetch stats for match -> get player's name by team -> present ROSTER for season.
REVIEW 2 - It would be impractical in terms of performance even by limiting to current season.

IDEA 3 - Manually add current team roster -> Fetch Specific player by player's name.
REVIEW 3 - Labor intensive.

IDEA 4 - Use another API for fetching team rosters -> Fetch specific player by player's name.
REVIEW 4 - Challenge of integration could be simple. No objections on requirement's documentation.

CONCLUSION -> Explore IDEA 4. In case of successful integration, it will make for better UX: the trade-off is limiting it for current season because of performance. It is better to have a relative fast usable site with selective info than a slow unusable site with comprehensive info.

### Player stats

Player stats filtered by season
ID: 17553967

What are the most important stats parameters?

- Scoring - points per game (PPG) -> (pts)
- Rebounding - rebounds per game (RPG) -> (reb)
- Assists - assists per game (APG) -> (ast)
- Defense - steals per game (SPG) -> (stl)
- Defense - blocks per game (BPG) -> (blk)
- Shooting - effective field goal (EFG%) -> (fgm | fg3m | fga)

EFG% = (fgm + 0.5 \* fg3m ) / fga

Field Goals Made (fgm)
Field Goals Attempted (fga)
Three-Point Field Goals Made (fg3m)
