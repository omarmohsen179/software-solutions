import React, { useState } from "react";
import { FormGroup } from "reactstrap";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CheckBox, SelectBox } from "../../../../components/Inputs";
import { CATEGORIES } from "../../Home.Api";
import InputTwoLanguages from "../../../../components/InputTwoLanguages/InputTwoLanguages";
import UploadImageButton from "../../../../components/UploadImageButton/UploadImageButton";
import { ApiBaseUrl } from "../../../../services/config";

function HomeCategoriesForm({
  data,
  HandleChange,
  handleGetImages,
  handleRemoveImage,
}) {
  const [categories, setCategories] = useState();
  useEffect(() => {
    CATEGORIES().then((e) => setCategories(e));
  }, []);
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%" }}>
      <div className="row">
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
            id="Description"
            label={"Description"}
            onValueChange={HandleChange}
            value={data?.Description}
            valueEn={data?.DescriptionEn}
          />
        </FormGroup>{" "}
        <div className="col">
          <FormGroup className="image__button">
            <UploadImageButton
              isMultiple={false}
              handleGetImages={handleGetImages}
              handleRemoveImage={handleRemoveImage}
              imagesFiles={
                data.ImagePath || data.Image
                  ? [data.ImagePath ? ApiBaseUrl + data.ImagePath : data.Image]
                  : []
              }
            />
          </FormGroup>
        </div>
        <div className="col">
          <FormGroup>
            <CheckBox
              label={t("Active")}
              value={data?.Active || false}
              name="Active"
              handleChange={HandleChange}
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

export default React.memo(HomeCategoriesForm);
