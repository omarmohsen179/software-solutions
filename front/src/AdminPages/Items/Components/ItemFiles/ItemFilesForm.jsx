import React, { useState } from "react";
import { FormGroup } from "reactstrap";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CheckBox, SelectBox } from "../../../../components/Inputs";
import UploadImageButton from "../../../../components/UploadImageButton/UploadImageButton";
import { ApiBaseUrl } from "../../../../services/config";

function ItemFilesForm({
  data,
  HandleChange,
  handleGetImages,
  handleRemoveImage,
}) {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%" }}>
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
              label={t("FullWidth")}
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
      </div>
    </div>
  );
}

export default React.memo(ItemFilesForm);
