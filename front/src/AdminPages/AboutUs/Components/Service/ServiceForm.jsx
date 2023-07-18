import React, { useCallback } from "react";
import { FormGroup, Input } from "reactstrap";
import InputTwoLanguages from "../../../../components/InputTwoLanguages/InputTwoLanguages";
import UploadImageButton from "../../../../components/UploadImageButton/UploadImageButton";
import { ApiBaseUrl } from "../../../../services/config";
import { CheckBox } from "../../../../components/Inputs";
import { useTranslation } from "react-i18next";

function ServiceForm({
  data,
  HandleChange,
  handleGetImages,
  handleRemoveImage,
}) {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%" }}>
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
          <FormGroup className="image__button">
            <UploadImageButton
              isMultiple={false}
              handleGetImages={handleGetImages}
              handleRemoveImage={handleRemoveImage}
              imagesFiles={
                data.ImagePath || data.Image
                  ? [data.ImagePath ? data.ImagePath : data.Image]
                  : []
              }
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
}

export default ServiceForm;
