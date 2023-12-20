import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/header';
import Main from '../components/mainContent';
import { act } from 'react-dom/test-utils';
import DataContextProvider from '../context/dataContext';

describe('Header', () => {
  it('renders header text', () => {
    render(
      <MemoryRouter>
        <DataContextProvider>
          <Header />
        </DataContextProvider>
      </MemoryRouter>
    );

    const headerText = screen.getByText('NBA by Bridge In');
    expect(headerText).toBeInTheDocument();
  });
  it('navigates to correct page when header is clicked', async () => {
    render(
      <MemoryRouter>
        <DataContextProvider>
          <Main />
        </DataContextProvider>
      </MemoryRouter>
    );

    const header = screen.getByRole('heading');
    act(() => {
      header.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    const teamText = await screen.findByText(/team 1/i);
    expect(teamText).toBeInTheDocument();
  });
});
