// src/components/MainContent.js
import React from 'react';
import '../css/MainContent.css';
import arrow from '../img/arrow-forward-1.svg';
import github from '../img/github-24-outline-1.svg';
import ins from '../img/instagram-24-outline-1.svg';
import fb from '../img/facebook-24-outline-1.svg';
import link from '../img/linkedin-24-outline-1.svg';

function MainContent() {
  return (
    <div className="cloner-cube-simple-wrapper">
      <div className="button-group">
        <button className="button">
          <div className="text-wrapper-4">Explore</div>
          <img className="arrow-forward" src={arrow} alt="Arrow" />
        </button>
        <div className="icons">
          <img className="img-3" src={github} alt="Github" />
          <img className="img-3" src={ins} alt="Instagram" />
          <img className="img-3" src={fb} alt="Facebook" />
          <img className="img-3" src={link} alt="LinkedIn" />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
