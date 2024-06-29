// Movies.js

import React, { useEffect, useRef, useState } from 'react';
import { fetchMovies } from '../../services/apiService';
import MovieCard from '../../components/MovieCard/MovieCard';
import Pagination from '../../components/pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import ScrollButton from '../../components/ScrollButton/ScrollButton';
import FilterDropdown from '../../components/FilterDropDown/FilterDropDown'; // Import the FilterDropdown component
import './movie.css';
import { languageOptions, yearOptions, regionOptions } from '../../utils/constant'; // Import filter options

const Movies = () => {
  // State and Refs
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to store error
  const totalPages = useRef(0);
  const [queryParams, setQueryParams] = useState({
    include_adult: false,
    language: 'en-US',
    primary_release_year: '',
    page: 1,
    region: '',
    year: ''
  });

  // Fetch movies effect
  useEffect(() => {
    fetchMoviesData(currentPage, queryParams);
  }, [currentPage, queryParams]);

  const fetchMoviesData = async (page, params) => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const data = await fetchMovies({ ...params, page });
      setMovies(data.results);
      totalPages.current = data.total_pages;
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to fetch movies. Please try again later.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  // Handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (name, value) => {
    setQueryParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  return (
    <div className="movies-page">
      <ScrollButton />
      <h1>Popular Movies</h1>
      <div className="filter-section">
        {/* Filter dropdowns */}
        <FilterDropdown
          label="Language"
          options={languageOptions}
          value={queryParams.language}
          onChange={(value) => handleFilterChange('language', value)}
        />
        <FilterDropdown
          label="Year"
          options={yearOptions}
          value={queryParams.primary_release_year}
          onChange={(value) => handleFilterChange('primary_release_year', value)}
        />
        <FilterDropdown
          label="Region"
          options={regionOptions}
          value={queryParams.region}
          onChange={(value) => handleFilterChange('region', value)}
        />
      </div>
      <div className="movies-container">
        {/* Show error message if there's an error */}
        {error && <div className="error-message">{error}</div>}
        {/* Show loader or movies */}
        {!error && (
          loading ? <Loader /> :
            movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))
        )}
      </div>
      {/* Pagination */}
      {!error && !loading && movies.length > 0 && (
        <Pagination
          totalPage={totalPages.current}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Movies;
