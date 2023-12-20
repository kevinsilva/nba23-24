import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('/api/teams', () => {
    return HttpResponse.json({
      data: [
        { id: 1, full_name: 'Team 1' },
        { id: 2, full_name: 'Team 2' },
        { id: 3, full_name: 'Team 3' },
      ],
    });
  }),
  http.get('/api/players', () => {
    return HttpResponse.json({
      data: [
        { id: 1, first_name: 'Player 1', last_name: 'Lastname 1', team_id: 1 },
        { id: 2, first_name: 'Player 2', last_name: 'Lastname 2', team_id: 2 },
        { id: 3, first_name: 'Player 3', last_name: 'Lastname 3', team_id: 3 },
      ],
      meta: {
        total_pages: 1,
      },
    });
  }),
];
