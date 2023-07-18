import classnames from "classnames";
import React, { useCallback, useState } from "react";
import { FormGroup, Input } from "reactstrap";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import InputTwoLanguages from "../../../components/InputTwoLanguages/InputTwoLanguages";
import TextEditorTwoLanguages from "../../../components/TextEditorTwoLanguages/TextEditorTwoLanguages";
import UploadImageButton from "../../../components/UploadImageButton/UploadImageButton";
import { ApiBaseUrl } from "../../../services/config";
import { CheckBox } from "../../../components/Inputs";
import { useTranslation } from "react-i18next";

function PostsForm({ data, setdata }) {
  const [state, setstate] = useState({
    activeTab: "1",
  });

  let HandleChange = useCallback(
    (value, id) => {
      setdata((prev) => ({ ...prev, [id]: value }));
    },
    [setdata]
  );
  let handleGetImages = (event) => {
    let files = event.target.files;
    setdata({ ...data, Image: files[0], ImagePath: "" });
  };
  function toggle(tab) {
    if (state.activeTab !== tab) {
      setstate({
        activeTab: tab,
      });
    }
  }
  let handleRemoveImage = useCallback(() => {
    setdata({ ...data, Image: "", ImagePath: "" });
  }, [data]);
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%" }}>
      <Nav tabs>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({ active: state.activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Initial info
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            style={{ cursor: "pointer" }}
            className={classnames({ active: state.activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Description
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={state.activeTab}>
        <TabPane tabId="1">
          <FormGroup>
            <label style={{ fontSize: "20px" }}>Rank</label>
            <Input
              id={"Rank"}
              value={data.Rank}
              onChange={(e) => HandleChange(e.target.value, e.target.id)}
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <InputTwoLanguages
              id="Title"
              label={"Title"}
              onValueChange={HandleChange}
              value={data?.Title}
              valueEn={data?.TitleEn}
            />
          </FormGroup>
          <FormGroup>
            <InputTwoLanguages
              id="SubTitle"
              label={"Sub Title"}
              onValueChange={HandleChange}
              value={data?.SubTitle}
              valueEn={data?.SubTitleEn}
            />
          </FormGroup>

          <FormGroup>
            <InputTwoLanguages
              id="OuterDescription"
              label={"Outer Description"}
              onValueChange={HandleChange}
              value={data?.OuterDescription}
              valueEn={data?.OuterDescriptionEn}
            />
          </FormGroup>
        </TabPane>
        <TabPane tabId="2">
          <FormGroup>
            <TextEditorTwoLanguages
              id="Description"
              label={"Description"}
              value={data?.Description}
              valueEn={data?.DescriptionEn}
              onValueChange={HandleChange}
            />
          </FormGroup>

          <div className="row">
            <div className="col-2">
              <FormGroup>
                <CheckBox
                  label={t("Active")}
                  value={data?.Active || false}
                  name="Active"
                  handleChange={HandleChange}
                />
              </FormGroup>
            </div>
            <div className="col-2">
              <FormGroup>
                <label htmlFor="isActive" className="d-block">
                  Is Article
                </label>
                <input
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  type="checkbox"
                  checked={data?.IsArticle}
                  id="IsArticle"
                  onChange={useCallback(
                    (e) => HandleChange(e.target.checked, e.target.id),
                    []
                  )}
                />
              </FormGroup>
            </div>
            <div className="col">
              <FormGroup className="image__button">
                <UploadImageButton
                  isMultiple={false}
                  handleGetImages={handleGetImages}
                  handleRemoveImage={handleRemoveImage}
                  imagesFiles={
                    data.ImagePath || data.Image
                      ? [
                          data.ImagePath
                            ? ApiBaseUrl + data.ImagePath
                            : data.Image,
                        ]
                      : []
                  }
                />
              </FormGroup>
            </div>
          </div>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default React.memo(PostsForm);
