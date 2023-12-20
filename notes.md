# BRIDGE IN NBA

## Structure

- 3 main sections: Header, Navigation, Main

## Features

- list all teams
- show a team roster
- stats of a player
- list all games
- stats from any game of given team

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
- Stats

filtering:

- every page should include a filtering input
  _filter by_
- Home: team name
- Roster: team name and player name
- Games: team name and date
- Stats: team name
  **one or two filtering inputs**

### Home

Displays all teams.
Displays navigation with active home/teams
A input text field filters by team name
If name does not correspond -> show no team available with that name
Clicking on a team redirects to \_\_ (either roster or games)

{JSON.stringify(teams, null, 2)}

### Roster

Displays selected team or pre-defined team.
Displays navigation with active roster.
An input text field filters by player's name.
If name does not correspond -> show no player available with that name
Clicking on a player redirects to \_\_ (stats)

How to fetch players from a given team?

- Api returns list of all players by pages.
- I can keep fetching until response.data.meta.next_page is null.
