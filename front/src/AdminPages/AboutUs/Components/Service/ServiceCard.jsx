import React from "react";
import { ApiBaseUrl } from "../../../../services/config";
import ImageComponent from "../../../../components/ImageComponent/ImageComponent";

export default function ServiceCard({ res }) {
  return (
    <div className="row">
      <div className="col-md-3 col-lg-2 col-sm-6  number-circle">
        <ImageComponent ImagePath={res.ImagePath} />
      </div>
      <div className="col-lg-8 col-md-7 col-sm-4">
        <div className="step-card-title">{res.Title}</div>
        <div>{res.Link}</div>
      </div>
    </div>
  );
}
