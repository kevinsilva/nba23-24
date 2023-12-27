import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TeamRoster from '../components/teamRoster';
import DataContextProvider from '../context/dataContext';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('teamRoster', () => {
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

    const playerItems = await screen.findAllByRole('row');
    expect(playerItems.length).toBe(18);
  });
  it('navigates to player stats page when player is clicked'),
    async () => {
      render(
        <DataContextProvider>
          <MemoryRouter initialEntries={['/teams/1/roster']}>
            <Routes>
              <Route path="/teams/:teamId/roster" element={<TeamRoster />} />
            </Routes>
          </MemoryRouter>
        </DataContextProvider>
      );

      const playerItems = await screen.findAllByRole('row');
      playerItems[0].click();
      expect(window.location.pathname).toBe('/players/334/stats');
    };
});
