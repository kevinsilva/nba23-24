import { StatsTypes } from './types';
export function getCurrentSeason() {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  if (month < 7) return year - 1;
  return year;
}

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
