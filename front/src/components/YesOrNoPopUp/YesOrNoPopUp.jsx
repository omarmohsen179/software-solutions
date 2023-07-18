import React from "react";
import { Popup } from "devextreme-react/popup";
import { Button } from "devextreme-react/button";
import { useTranslation } from "react-i18next";
function YesOrNoPopUp({ setdialog, dailog, OnDelete }) {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <Popup
        maxWidth={1000}
        title={""}
        minWidth={150}
        minHeight={100}
        height={200}
        width={350}
        showTitle={true}
        dragEnabled={false}
        // closeOnOutsideClick={true}
        visible={dailog.state}
        onHiding={() => setdialog(false)}
      >
        <div className="contianer" style={{ textAlign: "center" }}>
          <h4>{t("Are you sure ?")}</h4>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="col">
              <Button
                width={120}
                text={t("Ok")}
                type="normal"
                stylingMode="contained"
                onClick={() => {
                  OnDelete(dailog.id);
                  setdialog(false);
                }}
              />
            </div>
            <div className="col">
              <Button
                width={120}
                text={t("Cancel")}
                type="normal"
                stylingMode="contained"
                onClick={() => setdialog(false)}
              />
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default YesOrNoPopUp;
