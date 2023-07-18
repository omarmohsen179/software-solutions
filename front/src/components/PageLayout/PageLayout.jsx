import React, { useMemo, memo, useCallback, useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";

import "devextreme/dist/css/dx.light.css";
import { useTranslation } from "react-i18next";

import "devextreme/dist/css/dx.light.css";
import LoadingPanel from "../LoadingPanel";
import { SelectBox } from "devextreme-react";
import { useDispatch } from "react-redux";
import { getData } from "../../store/DataReducer";
const PageLayout = ({ children, loading = false, onHiding, title, submit }) => {
  const { t, i18n } = useTranslation();
  let dispatch = useDispatch();
  const data = async () => {
    const x = await getData();
    dispatch(x);
  };
  return (
    <div>
      <Card className="container card-user" style={{ marginBottom: "20px" }}>
        <CardHeader
          style={{
            backgroundColor: "white",
            textAlign: i18n.language === "en" ? "left" : "right",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2>{t(title)} </h2>
            </div>
            <div style={{ cursor: "pointer" }} onClick={data}>
              <i className="fa-sharp fa-solid fa-rotate"></i>
            </div>
          </div>
        </CardHeader>

        <CardBody
          style={{
            direction: i18n.language === "en" ? "ltr" : "rtl",
          }}
        >
          <LoadingPanel loading={loading} onHiding={onHiding} />
          <form onSubmit={submit}>{children}</form>
        </CardBody>
      </Card>
    </div>
  );
};

export default PageLayout;
