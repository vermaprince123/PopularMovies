import React from 'react';
import PropTypes from 'prop-types';
import './pagination.css';
import LinkedList from '../utils/linkedList';

let ll = new LinkedList();

const Pagination = ({ currentPage, onPageChange }) => {

  const handlePrevClick = () => {
    if (!ll.isEmpty()) {
      ll.goToPrev();
      onPageChange(ll.getCurrentPage());
    }
  };


  const handleNextClick = () => {
    ll.goToNext();
    onPageChange(ll.getCurrentPage());
  };

  
  return (
    <div className="pagination">
      <button
        onClick={handlePrevClick}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
