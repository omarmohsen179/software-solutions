import ImageComponent from "../../../../components/ImageComponent/ImageComponent";
import { ApiBaseUrl } from "../../../../services/config";
function HomeCategoriesCard({ res }) {
  return (
    <div className="row">
      <div className="col-md-3 col-lg-2 col-sm-6  number-circle">
        <ImageComponent ImagePath={res.ImagePath} />
      </div>
      <div className="col-lg-8 col-md-7 col-sm-4">
        <div className="step-card-title">{res?.Title}</div>
      </div>
    </div>
  );
}

export default HomeCategoriesCard;
