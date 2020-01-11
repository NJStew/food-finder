import React from 'react';
import './App.css';

import finderbtn from './images/finderbtn.png';
import backbtn from './images/backbtn.png';

import {flip, setChoice, getLocation, getRest} from './functions/mainFunctions.js';

function App() {
  return (
    <div className="app" onLoad={getLocation}>
      <div className="side-banner">
        <h4 className="side-banner-h4">Welcome to Food Finder!</h4>
        <p className="side-banner-p">Click on one of the prices to set your max price, and click one of the distance options to set your max distance.</p>
        <p className="side-banner-p">Enjoy your food!</p>
      </div>
      <div className="card">
        <div id="display-front" className="card-inner">
          <div className="card-front">
            <h6 className="choices-title">Price</h6>
            <div className="choices-container">
              <div id="price-one" className="choice-box box-one price-one" onClick={(e) => setChoice(e.target)}><h6 className="choice-text">$</h6></div>
              <div id="price-two" className="choice-box box-two price-two"><h6 className="choice-text" onClick={(e) => setChoice(e.target)}>$$</h6></div>
              <div id="price-three" className="choice-box box-three price-three"><h6 className="choice-text" onClick={(e) => setChoice(e.target)}>$$$</h6></div>
            </div>
            <h6 className="choices-title">Distance (Mi.)</h6>
            <div className="choices-container">
              <div id="distance-one" className="choice-box box-one distance-one"><h6 className="choice-text" onClick={(e) => setChoice(e.target)}>1</h6></div>
              <div id="distance-two" className="choice-box box-two distance-two"><h6 className="choice-text" onClick={(e) => setChoice(e.target)}>10</h6></div>
              <div id="distance-three" className="choice-box box-three distance-three"><h6 className="choice-text" onClick={(e) => setChoice(e.target)}>30</h6></div>
            </div>
            <button className="find-btn" onClick={getRest}><img id="find-btn-img" className="find-btn-img" src={finderbtn} alt="Find Restaurant"></img></button>
            <p id="error"></p>
          </div>
          <div className="card-back">
            <h5 className="card-back-h5" id="title">Title</h5>
            <ul>
              <li><h6 className="card-back-h6" id="rating">Rating: </h6></li>
              <li><h6 className="card-back-h6" id="price">Price: </h6></li>
              <li><h6 className="card-back-h6" id="address">Address: <a id="address-link" className="card-back-a" href="https://www.google.com/maps" target="_blank">Link</a></h6></li>
            </ul>
            <button className="back-btn" onClick={flip}><img className="back-btn-img" src={backbtn} alt="Back Button"></img></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
