import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TeamRoster from '../components/teamRoster';
import { server } from '../mocks/server';
import { HttpResponse, http } from 'msw';
import DataContextProvider from '../context/dataContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('teamRoster', () => {
  it('should render loading text on page when loading data', async () => {
    render(
      <DataContextProvider>
        <TeamRoster />
      </DataContextProvider>
    );
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });
  it('renders players from correct team', async () => {
    render(
      <DataContextProvider>
        <MemoryRouter initialEntries={['/teams/1/roster']}>
          <Routes>
            <Route path="/teams/:teamId/roster" element={<TeamRoster />} />
          </Routes>
        </MemoryRouter>
      </DataContextProvider>
    );

    const playerItems = await screen.findAllByRole('listitem');
    expect(playerItems.length).toBe(2);
  });
  it('renders error message when fetch fails', async () => {
    server.use(
      http.get('api/players', () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: 'Error fetching players. Please try again.',
        });
      })
    );
    render(
      <DataContextProvider>
        <MemoryRouter initialEntries={['/teams/1/roster']}>
          <Routes>
            <Route path="/teams/:teamId/roster" element={<TeamRoster />} />
          </Routes>
        </MemoryRouter>
      </DataContextProvider>
    );

    const errorMessage = await screen.findByText(
      'Error fetching players. Please try again.'
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
