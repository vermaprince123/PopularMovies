import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './pagination.css';
import LinkedList from '../../utils/linkedList';

let llRef;

const Pagination = ({ currentPage, onPageChange, totalPage }) => {

  useEffect(() => {
    // Initialize the LinkedList only once
    if (!llRef) {
      llRef = new LinkedList(currentPage, totalPage);
    }
  }, [currentPage, totalPage]);

  const handlePrevClick = () => {
    const current = llRef?.goToPrev();
    if (current) {
      onPageChange(current.data);
    }
  };

  const handleNextClick = () => {
    const current = llRef?.goToNext();
    console.log(current)
    if (current) {
      onPageChange(current.data);
    }
  };


  return (
    <div className="pagination">
      <button onClick={handlePrevClick} disabled={llRef?.isOnFirst() ?? 1}>
        Previous
      </button>
      <button onClick={handleNextClick} disabled={llRef?.isOnLast()}>
        Next
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalPage: PropTypes.number.isRequired,
};

export default Pagination;
