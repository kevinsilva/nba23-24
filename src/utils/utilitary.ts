import { StatsTypes } from './types';
export const gamesPerPage = 25;
export const season = '2023';
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
