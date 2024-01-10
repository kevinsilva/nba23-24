import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/navigation';
import { act } from 'react-dom/test-utils';
import DataContextProvider from '../context/dataContext';
import TeamsList from '../components/teamsList';

describe('Navigation', () => {
  beforeEach(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });

  it('renders all navigation links', () => {
    render(
      <MemoryRouter>
        <DataContextProvider>
          <Navigation />
        </DataContextProvider>
      </MemoryRouter>
    );

    const links = screen.getAllByRole('listitem');
    expect(links.length).toBe(3);
  });
  it('renders all navigation links with correct text', () => {
    render(
      <MemoryRouter>
        <DataContextProvider>
          <Navigation />
        </DataContextProvider>
      </MemoryRouter>
    );

    const links = screen.getAllByRole('listitem');
    expect(links[0]).toHaveTextContent('Teams');
    expect(links[1]).toHaveTextContent('Roster');
    expect(links[2]).toHaveTextContent('Games');
  });
  it('navigates to correct page when link is clicked', async () => {
    render(
      <MemoryRouter>
        <DataContextProvider>
          <Navigation />
          <TeamsList />
        </DataContextProvider>
      </MemoryRouter>
    );

    const links = screen.getAllByRole('listitem');
    const teamsLink = links[0];
    act(() => {
      teamsLink.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const teamText = await screen.findByText(/team 1/i);
    expect(teamText).toBeInTheDocument();
  });
});
