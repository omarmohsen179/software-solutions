import notify from "devextreme/ui/notify";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormGroup } from "reactstrap";
import CardForm from "../../../components/CardForm/CardForm";
import PopUpModel from "../../../components/PopUpModel/PopUpModel";
import YesOrNoPopUp from "../../../components/YesOrNoPopUp/YesOrNoPopUp";

import { ApiBaseUrl } from "../../../services/config";
import { POSTS, POSTS_DELETE, POSTS_INSERT, POSTS_UPDATE } from "../API";
import PostsForm from "./PostsForm";
import ImageComponent from "../../../components/ImageComponent/ImageComponent";
function PostsList() {
  let [data, setdata] = useState([]);
  let [Original, setOriginal] = useState([]);
  let [Values, setValues] = useState({ Article: true, News: true });
  let defualtValues = useRef({
    Id: 0,
    Title: "",
    TitleEn: "",
    SubTitle: "",
    SubTitleEn: "",
    Description: "",
    DescriptionEn: "",
    OuterDescriptionEn: "",
    OuterDescription: "",
    Rank: 0,
    ImagePath: "",
    Image: null,
    Active: false,
  });
  let [YesOrNo, setYesOrNo] = useState({ id: 0, state: false });
  let [popup, setpopup] = useState(false);
  let [datapop, setdatapop] = useState({});

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
  const OnDelete = useCallback(
    async (id) => {
      if (id <= 0) {
        notify("Error in information. select Again! ");
        return;
      }
      await POSTS_DELETE(id)
        .then(() => {
          let x = data.filter(function (el) {
            return el.Id !== id;
          });
          setdata(x);
          let Org = Original.filter(function (el) {
            return el.Id !== id;
          });
          setOriginal(Org);
          notify("Deleted successfuly", "success", 3000);
        })
        .catch(() => {
          notify("Error in information. try again! ", "error", 3000);
        });
    },
    [Original, data]
  );

  const OnSubmit = async (id) => {
    let formData = new FormData();
    for (let [key, value] of Object.entries(datapop)) {
      formData.append(key.toString(), value !== null ? value : "");
    }
    if (datapop.Id == 0) {
      await POSTS_INSERT(formData)
        .then((res) => {
          notify("Added successfully", "success", 3000);
          Original.push(res);
          setdata(Original);
          setOriginal(Original);
          setValues({ Article: true, News: true });
          setpopup(false);
          setdatapop({});
        })
        .catch(() => {
          notify("Error in information. try again! ", "error", 3000);
        });
    } else {
      await POSTS_UPDATE(formData)
        .then((res) => {
          notify("Updated successfuly", "success", 3000);
          setdata(
            Original.map((ele) => {
              return ele.Id == datapop.Id ? { ...res } : { ...ele };
            })
          );
          setOriginal(
            Original.map((ele) => {
              return ele.Id == datapop.Id ? { ...res } : { ...ele };
            })
          );
          setpopup(false);
          setdatapop({});
        })
        .catch(() => {
          notify("Error in information. try again! ", "error", 3000);
        });
    }
  };

  const openPopupInsert = useCallback(() => {
    setpopup(true);
    setdatapop(defualtValues.current);
  }, []);

  return (
    <div>
      <CardForm title=" Posts">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "50%",
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
        <div className="Add-icon-form " onClick={openPopupInsert}>
          <i className="far fa-plus-square"></i>
        </div>
        {data.map((res, index) => {
          return (
            <div
              onClick={() => {
                setpopup(true);
                setdatapop(res);
              }}
              key={index + 1}
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
              <div
                className="col-lg-2 col-md-2 col-sm-2 delete-icon-crud"
                onClick={() => setYesOrNo({ id: res.Id, state: true })}
              >
                <i className=" fas fa-trash-alt"></i>
              </div>
            </div>
          );
        })}
      </CardForm>
      <PopUpModel
        maxWidth={2000}
        setdialog={setpopup}
        dailog={popup}
        Submit={OnSubmit}
      >
        <PostsForm data={datapop} setdata={setdatapop} />
      </PopUpModel>
      <YesOrNoPopUp
        dailog={YesOrNo}
        setdialog={(e) => setYesOrNo({ ...YesOrNo, state: e })}
        OnDelete={OnDelete}
      />
    </div>
  );
}

export default PostsList;
