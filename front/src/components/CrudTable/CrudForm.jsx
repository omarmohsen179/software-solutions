import React, { memo, useCallback } from "react";
import PopUpModel from "../PopUpModel/PopUpModel";
import { useTranslation } from "react-i18next";

function CrudForm({
  data,
  handleChange,
  ElementForm,
  setLoading,
  setPopupStatus,
  title,
  loading,
  status,
  Submit,
}) {
  const { t, i18n } = useTranslation();

  let handleGetImages = useCallback(
    (event) => {
      let files = event.target.files;
      handleChange({ Image: files[0] });
      handleChange({ ImagePath: "" });
    },
    [handleChange]
  );
  let handleRemoveImage = useCallback(() => {
    handleChange({ Image: "" });
    handleChange({ ImagePath: "" });
  }, [handleChange]);

  return (
    <PopUpModel
      setdialog={setPopupStatus}
      title={t(title)}
      loading={loading}
      dailog={status}
      Submit={Submit}
    >
      <ElementForm
        values={data}
        handleRemoveImage={handleRemoveImage}
        handleGetImages={handleGetImages}
        handleChange={handleChange}
        setLoading={setLoading}
      />
    </PopUpModel>
  );
}

export default memo(CrudForm);
