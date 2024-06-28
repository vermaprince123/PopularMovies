import React from 'react';
import { render } from '@testing-library/react';
import MovieCard from './MovieCard';

describe('MovieCard Component', () => {
  const movie = {
    id: 1,
    title: 'Example Movie',
    overview: 'This is an example movie overview.',
    release_date: '2023-01-01',
    vote_average: 7.5,
    vote_count: 100,
    poster_path: '/example_poster.jpg',
  };

  it('renders movie details correctly', () => {
    const { getByText } = render(<MovieCard movie={movie} />);
    expect(getByText(/Release Date:/)).toBeTruthy();
    expect(getByText(/2023-01-01/)).toBeTruthy();
  });
});
