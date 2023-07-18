import React from "react";
import { useTranslation } from "react-i18next";
import { FormGroup } from "reactstrap";
import InputTwoLanguages from "../../../../components/InputTwoLanguages/InputTwoLanguages";
import { CheckBox, TextBox } from "../../../../components/Inputs";
import UploadImageButton from "../../../../components/UploadImageButton/UploadImageButton";
import { ApiBaseUrl } from "../../../../services/config";
function HeadersForm({
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
          <CheckBox
            label={t("Is Active")}
            handleChange={HandleChange}
            value={data?.Active}
            name={"Active"}
          />
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

export default HeadersForm;
