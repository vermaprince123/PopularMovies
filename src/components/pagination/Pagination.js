import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './pagination.css';
import LinkedList from '../../utils/linkedList';

const Pagination = ({ currentPage, onPageChange,totalPage }) => {

  //ll - linkedlist
  const [ll,setll] = useState(null);

  useEffect(()=>{
    setll(new LinkedList(currentPage,totalPage))
  },[]);

  const handlePrevClick = () => {
    const current = ll.goToPrev();
    if (current) {
      onPageChange(current.data);
    }
  };


  const handleNextClick = () => {
    const current = ll.goToNext();
    if(current){
      onPageChange(current.data);
    }
  };

  
  return (
    <div className="pagination">
      <button
        onClick={handlePrevClick}
        disabled={ll?.isOnFirst()}
      >
        Previous
      </button>
      <button onClick={handleNextClick} disabled={ll?.isOnLast()}>
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
