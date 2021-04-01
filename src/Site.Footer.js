import React from 'react';
import './App.css';

function SiteFooter() {
  return (
    <div className="container-fluid mt-3 py-3 footer">
      <div className="row justify-content-end align-items-center">
        <div className="col-sm-6">
          <p>You can contact me at <a href="mailto:ben@bensmithsound.uk" className="text-reset" target="_blank" rel="noreferrer">ben@bensmithsound.uk</a></p>
        </div>
        <div className="col-sm-2">
          <a
            href="https://www.audinate.com/learning/training-certification/dante-certification-program"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="float-end footer-image"
              src="images/other-icons/dante_certified_seal_level3.png"
              alt="Dante certified seal level 3"
              height="80rem"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SiteFooter;