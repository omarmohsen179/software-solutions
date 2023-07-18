import React, { useCallback, useEffect, useState } from "react";
import { FormGroup } from "reactstrap";
import PopUpModel from "../../../components/PopUpModel/PopUpModel";
import { ApiBaseUrl } from "../../../services/config";
import { POSTS } from "../../Posts/API";
import ImageComponent from "../../../components/ImageComponent/ImageComponent";

function SelectPost({ onSelect, visible, setvisible }) {
  let [data, setdata] = useState([]);
  let [Original, setOriginal] = useState([]);
  let [Values, setValues] = useState({ Article: true, News: true });

  useEffect(() => {
    POSTS()
      .then((res) => {
        setdata(res);
        setOriginal(res);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (Values.Article && Values.News) {
      setdata(Original);
    } else if (Values.Article && !Values.News) {
      setdata(Original.filter((ele) => ele.IsArticle));
    } else if (!Values.Article && Values.News) {
      setdata(Original.filter((ele) => !ele.IsArticle));
    }
  }, [Values]);
  const HandleChange = useCallback(
    (value, id) => {
      setValues({
        ...Values,
        [id]: value,
      });
    },
    [Values]
  );

  return (
    <PopUpModel
      dailog={visible}
      setdialog={(e) => setvisible(e)}
      setvisible={setvisible}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "300px",
        }}
      >
        <FormGroup>
          <label htmlFor="isActive" className="d-block">
            News
          </label>
          <input
            style={{
              width: "40px",
              height: "40px",
            }}
            type="checkbox"
            checked={Values?.News}
            id="News"
            onChange={(e) => HandleChange(e.target.checked, "News")}
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="isActive" className="d-block">
            Article
          </label>
          <input
            style={{
              width: "40px",
              height: "40px",
            }}
            type="checkbox"
            checked={Values?.Article}
            id="Article"
            onChange={(e) => HandleChange(e.target.checked, "Article")}
          />
        </FormGroup>
      </div>

      {data.map((res, index) => {
        return (
          <div
            key={index}
            onClick={() => onSelect(res)}
            className="row Home-benefits-card"
          >
            <div className="col-md-3 col-lg-2 col-sm-6  number-circle">
              <ImageComponent ImagePath={res.ImagePath} />
            </div>
            <div className="col-lg-8 col-md-7 col-sm-4">
              <div className="step-card-title">{res.Title}</div>
              <div>{res.SubTitle}</div>

              <div>{res.IsArticle ? " Is Article" : "Is News"}</div>
            </div>
          </div>
        );
      })}
    </PopUpModel>
  );
}

export default SelectPost;
