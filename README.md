<p align="center"><img src="./src/assets/nba_logo.png" width="100"></p>

<div align="center">

<a href="">[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-success?style=flat-square&logo=codesandbox)]()</a>

</div>

# NBA 23-24

A React-based front-end application about your current favorite NBA teams and players.

The NBA 23-24 is a React-based web application that provides information about current NBA teams, rosters, player statistics, game statistics, and upcoming/previous games.

## Implementation Details

This project leverages data from [Free-NBA](https://rapidapi.com/theapiguy/api/free-nba) to showcase NBA data. To enhance user experience, I've opted to reference data from the current season, minimizing requests from the free API and delivering cleaner, more concise information. The project is built with [React](https://react.dev/) and incorporates [TypeScript](https://www.typescriptlang.org/) for code robustness. It integrates a Dark Mode toggle through the ThemeSwitch component. Initialized with a default 'light' theme, it dynamically adjusts to stored preferences or user system settings using [Tailwind CSS](https://tailwindcss.com) dark class settings. Navigation is powered by [react-router-dom](https://www.npmjs.com/package/react-router-dom), and animations are implemented using [Framer-Motion](https://www.framer.com/motion/). Testing is conducted with [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro/) and [MSW](https://mswjs.io/).

## Usage

The project is structured into several components inherent to main application features.

### 1. TeamsList

The `TeamsList` component serves as the home page, displaying a comprehensive list of NBA teams. It utilizes the `useDataContext` hook to efficiently fetch and manage team data across various main components.

### 2. TeamRoster

When a team is selected from the home page or teams list, the `TeamRoster` component provides a detailed view of the team's roster. Due to the absence of direct season filtering in the Free-NBA API for rosters, local player data is fetched using the `useParams` and `useDataContext` hooks from the `ROSTERS`´s object. Other features include team filtering and the ability to navigate to a selected player's stats after fetching their playerId.

### 3. TeamGames

The `TeamGames` component presents upcoming and previous games for a selected NBA team. Supporting features include pagination and game selection for specific game stats. Data is fetched using the `useParams` hook and custom utility functions. Game listings follow chronological logic. There is an indication on whether the selected team won or lost based on API data scores. The display avoids superfluous information such as the selected team on the game list.

### 4. GameStats

The `GameStats` component displays high-level statistics for a specific NBA game, showcasing top performers in points, rebounds, and assists. It fetches individual player game stats and renders players with the most impressive statistics.

### 5. PlayerStats

The `PlayerStats` component offers detailed statistics for a selected NBA player. It fetches player stats using the `useParams` and `useDataContext` hooks, supporting pagination for an organized and chronological display of the player's performance over multiple games.

This project uses data from [Free-NBA](https://rapidapi.com/theapiguy/api/free-nba) to display NBA games data. In order to maintain a level of user experience I have decided to refer to current season data for two main reasons: less requests from a limiting free API and cleaner, concise information. This [React's](https://react.dev/) project uses [TypeScript](https://www.typescriptlang.org/) for code robustness. Navigations use [react-router-dom](https://www.npmjs.com/package/react-router-dom). Animations are done with [Framer-Motion](https://www.framer.com/motion/) and test with [React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro/) and [MSW](https://mswjs.io/).

## Development

To install the component, clone repository, change into directory on the terminal and install with npm.

```bash
git clone https://github.com/kevinsilva/nba23-24
cd nba23-24
npm install
```

To run the application.

```bash
  npm run start
```

To run the tests.

```bash
  npm run test
```

## Credits

The NBA logo used in this project is the intellectual property of the [National Basketball Association](https://www.nba.com/).

Data from [Free-NBA API](https://rapidapi.com/theapiguy/api/free-nba) and references from [Basketball-Reference](https://www.basketball-reference.com/).

## License

[MIT](https://choosealicense.com/licenses/mit/)
