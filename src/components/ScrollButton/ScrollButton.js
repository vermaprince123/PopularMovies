// ScrollButton.js
import React, { useState, useEffect } from 'react';
import './scrollButton.css';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisible);
    return () => {
      window.removeEventListener('scroll', toggleVisible);
    };
  }, []);

  return (
    <div className="scroll-button">
      {visible && (
        <button className="scroll-top" onClick={scrollToTop}>
          <span className="arrow-up"></span>
        </button>
      )}
      {visible && (
        <button className="scroll-bottom" onClick={scrollToBottom}>
          <span className="arrow-down"></span>
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
