import ImageComponent from "../../../../components/ImageComponent/ImageComponent";
import { ApiBaseUrl } from "../../../../services/config";
function ItemCard({ res }) {
  return (
    <div className="row">
      <div className="col-md-3 col-lg-2 col-sm-6  number-circle">
        <ImageComponent ImagePath={res.ImagePath} />
      </div>
      <div
        onClick={() => setpopup({ data: res, status: !popup.status })}
        className="col-lg-8 col-md-7 col-sm-4"
      >
        <div className="step-card-title">{res.Title}</div>
        <div>{res.Description}</div>
      </div>
    </div>
  );
}

export default ItemCard;
