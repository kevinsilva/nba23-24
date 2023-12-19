import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import TeamsList from '../components/teamsList';

describe('TeamsList', () => {
  it('should render all team names on page', async () => {
    render(<TeamsList />);

    const teamItems = await screen.findAllByRole('listitem');
    expect(teamItems.length).toBe(3);
  });
});
