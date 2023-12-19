import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TeamsList from '../components/teamsList';
import { server } from '../mocks/server';
import { HttpResponse, http } from 'msw';

describe('TeamsList', () => {
  it('should render loading text on page when loading data', async () => {
    render(<TeamsList />);

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });
  it('should render all team names on page', async () => {
    render(<TeamsList />);

    const teamItems = await screen.findAllByRole('listitem');
    expect(teamItems.length).toBe(3);
  });
  it('renders error message when fetch fails', async () => {
    server.use(
      http.get('api/teams', () => {
        return new HttpResponse(null, {
          status: 500,
          statusText: 'Error fetching teams. Please try again.',
        });
      })
    );
    render(<TeamsList />);

    const errorMessage = await screen.findByText(
      'Error fetching teams. Please try again.'
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
