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
import { getFromCache, putIntoCache } from '../../utils/cache'; // Import caching functions

const Movies = () => {
  // State and Refs
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to store error
  const totalPages = useRef(1);
  const [queryParams, setQueryParams] = useState({
    include_adult: false,
    language: 'en-US',
    primary_release_year: '',
    region: '',
    year: '',
    page:1
  });

  // Fetch movies effect
  useEffect(() => {
    fetchMoviesData(queryParams);
  }, [queryParams,currentPage]);

  const fetchMoviesData = async (params) => {
    console.log(params,currentPage)
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      // Generate cache key based on params to uniquely identify the request
      const cacheKey = JSON.stringify({
        ...params,
        page: currentPage // Use currentPage as the page key
      });

      // Check if data exists in cache
      const cachedData = getFromCache(cacheKey);
      if (cachedData) {
        setMovies(cachedData);
        totalPages.current = cachedData.total_pages;
        setLoading(false);
        return;
      }

      // Fetch data from API if not found in cache
      const data = await fetchMovies({ ...params, page: currentPage });
      setMovies(data.results);
      totalPages.current = data.total_pages;

      // Cache fetched data for future use
      putIntoCache(cacheKey, data.results);
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
          totalPage={totalPages.current ?? 1}
          currentPage={currentPage ?? 1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Movies;
