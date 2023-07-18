import React, { useCallback, useState } from "react";
import { FormGroup } from "reactstrap";
import InputTwoLanguages from "../../../../components/InputTwoLanguages/InputTwoLanguages";
import UploadImageButton from "../../../../components/UploadImageButton/UploadImageButton";
import { ApiBaseUrl } from "../../../../services/config";
import { CheckBox, SelectBox } from "../../../../components/Inputs";
import { useTranslation } from "react-i18next";
import { CATEGORIES } from "../../../Categories/Categories.Api";
import { useEffect } from "react";

function ItemForm({ data, HandleChange, handleGetImages, handleRemoveImage }) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState();
  useEffect(() => {
    CATEGORIES().then((e) => setCategories(e));
  }, []);
  let handleGetModel = (event) => {
    let files = event.target.files;
    HandleChange(files[0], "Model");
  };
  let handleRemoveModel = useCallback(() => {
    HandleChange("", "Model");
    HandleChange("", "ItemModel");
  }, [HandleChange]);
  return (
    <div style={{ width: "100%" }}>
      <FormGroup>
        <SelectBox
          label={t("Category")}
          dataSource={categories}
          keys={{ id: "Id", name: "Title", nameEn: "TitleEn" }}
          value={data?.CategoryId}
          name="CategoryId"
          handleChange={HandleChange}
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
          id="Description"
          label={"Description"}
          onValueChange={HandleChange}
          value={data?.Description}
          valueEn={data?.DescriptionEn}
        />
      </FormGroup>

      <div className="row">
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
        <div className="col">
          <FormGroup>
            <CheckBox
              label={t("Full Width")}
              value={data?.FullWidth || false}
              name="FullWidth"
              handleChange={HandleChange}
            />
          </FormGroup>
        </div>
        <div className="col-12">
          <FormGroup className="image__button">
            <UploadImageButton
              isMultiple={false}
              handleGetImages={handleGetImages}
              handleRemoveImage={handleRemoveImage}
              imagesFiles={
                data?.ImagePath || data?.Image
                  ? [data.ImagePath ? ApiBaseUrl + data.ImagePath : data.Image]
                  : []
              }
            />
          </FormGroup>
        </div>
        <div className="col-12">
          <FormGroup className="image__button">
            <UploadImageButton
              isMultiple={false}
              title="Upload 3D model"
              handleGetImages={handleGetModel}
              handleRemoveImage={handleRemoveModel}
              accept=".obj"
              imagesFiles={
                data?.ItemModel || data?.Model
                  ? [data.ItemModel ? data.ItemModel : data.Model]
                  : []
              }
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

export default ItemForm;
