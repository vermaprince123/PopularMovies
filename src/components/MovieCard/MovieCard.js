import React from "react";
import './movieCard.css';

const MovieCard = ({ movie }) => {
    const { poster_path, title, release_date, vote_average, vote_count, overview} = movie ?? {};
    return (
      <div className="movie-card">
        <img 
          src={`https://image.tmdb.org/t/p/w500${poster_path}`} 
          alt={`${title} poster`}
        />
        <div className="movie-details">
          <h2>{title}</h2>
          <p><strong>Release Date:</strong>{release_date}</p>
          <p><strong>Rating:</strong> {vote_average} ({vote_count} votes)</p>
          <p><strong>Overview:</strong> {overview}</p>
        </div>
      </div>
    );
};

export default MovieCard;