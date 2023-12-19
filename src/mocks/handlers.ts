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
];
