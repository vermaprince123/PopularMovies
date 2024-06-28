import React, { useEffect, useState } from 'react';
import { fetchMovies } from './services/apiService';
import MovieCard from './components/MovieCard/MovieCard';
import Pagination from './components/pagination/Pagination';
import Loader from './components/Loader/Loader';
import Search from './components/Search/Search';
import './app.css';
import ScrollButton from './components/ScrollButton/ScrollButton';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [queryParams, setQueryParams] = useState({
    include_adult: false,
    language: 'en-US',
    primary_release_year: '',
    page: 1,
    region: '',
    year: ''
  });

  useEffect(() => {
    fetchMoviesData(currentPage, queryParams);
  }, [currentPage, queryParams]);

  const fetchMoviesData = async (page, params) => {
    setLoading(true);
    try {
      const data = await fetchMovies({ ...params, page });
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setQueryParams({
      include_adult: false,
      language: 'en-US',
      primary_release_year: '',
      page: 1,
      region: '',
      year: ''
    });
  };

  const handleFilterChange = (name, value) => {
    setQueryParams(prevParams => ({
      ...prevParams,
      [name]: value
    }));
  };

  return (
    <div className="app">
      <ScrollButton />
      <h1>Popular Movies</h1>
      <Search onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <div className="movies-container">
        {loading ? (
          <Loader />
        ) : (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
