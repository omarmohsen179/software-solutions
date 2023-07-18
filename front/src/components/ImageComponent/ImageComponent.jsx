import React from "react";
import "./ImageComponent.css";
import { ApiBaseUrl } from "../../services/config";
import placeholder from "../../assets/placeholder.png";
export default function ImageComponent({ ImagePath }) {
  return (
    <div className="step-benefit">
      <img
        src={ImagePath ? ApiBaseUrl + ImagePath : placeholder}
        width="300px"
        height="auto"
      />
    </div>
  );
}
