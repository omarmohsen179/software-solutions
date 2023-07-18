import React from "react";

export default function WebLoading() {
  return (
    <div
      className="preloader-wrap"
      data-firstline="Enjoy"
      data-secondline="Custom Solutions"
    >
      <div className="outer">
        <div className="inner">
          <div className="trackbar">
            <div className="loadbar" />
          </div>
          <div className="percentage-wrapper">
            <div className="percentage" id="precent" />
          </div>
          <div className="percentage-intro">
            Loading Custom Solutions Experience
          </div>
        </div>
      </div>
    </div>
  );
}
