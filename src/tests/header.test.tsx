import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/header';
import { act } from 'react-dom/test-utils';
import DataContextProvider from '../context/dataContext';
import TeamsList from '../components/teamsList';

describe('Header', () => {
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
  it('renders header text', () => {
    render(
      <MemoryRouter>
        <DataContextProvider>
          <Header />
        </DataContextProvider>
      </MemoryRouter>
    );

    const headerText = screen.getByText('NBA');
    expect(headerText).toBeInTheDocument();
  });
  it('navigates to correct page when header is clicked', async () => {
    render(
      <MemoryRouter>
        <DataContextProvider>
          <Header />
          <TeamsList />
        </DataContextProvider>
      </MemoryRouter>
    );

    const header = screen.getByText('NBA');
    act(() => {
      header.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const teamText = await screen.findByText(/team 1/i);
    expect(teamText).toBeInTheDocument();
  });
});
