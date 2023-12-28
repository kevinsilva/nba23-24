import {
  TeamGameTypes,
  StatsTypes,
  TeamTypes,
  StatsLabelsTypes,
} from './types';
export const gamesPerPage = 25;
export const season = '2023';

export const initialHighStatsState = {
  pts: {
    player: '',
    value: 0,
    teamId: 0,
  },
  reb: {
    player: '',
    value: 0,
    teamId: 0,
  },
  ast: {
    player: '',
    value: 0,
    teamId: 0,
  },
};

export function getHighestStatPlayer(
  games: StatsTypes[],
  stat: keyof StatsTypes
) {
  if (!games) {
    return;
  }

  let highestStatPlayer = games[0].player;
  let highestStatValue = games[0][stat];

  for (const game of games) {
    if (game[stat]! > highestStatValue!) {
      highestStatValue = game[stat]!;
      highestStatPlayer = game.player;
    }
  }

  return {
    player: `${highestStatPlayer.first_name} ${highestStatPlayer.last_name}`,
    value: highestStatValue,
    teamId: highestStatPlayer.team_id,
  };
}

export function checkIfTeamWon(game: TeamGameTypes, teamId: number) {
  if (game.home_team_score === null || game.visitor_team_score === null) return;
  if (game.home_team_score === 0 || game.visitor_team_score === 0) return null;

  if (game.home_team.id === teamId) {
    return game.home_team_score > game.visitor_team_score;
  } else if (game.visitor_team.id === teamId) {
    return game.visitor_team_score > game.home_team_score;
  }
}
export function getTeamNameById(teams: TeamTypes[], teamId: number) {
  const team = teams.find((team) => team.id === teamId);
  return team ? team.full_name : '';
}

export const statsLabels: StatsLabelsTypes = {
  pts: 'High Points',
  reb: 'High Rebounds',
  ast: 'High Assists',
};

export const teamsContainerAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, duration: 1 } },
};

export const teamsItemAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1 } },
};
