import React from "react";
import { useTranslation } from "react-i18next";

export default function AboutUs({ data }) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div
        className="vc_row row_padding_top row_padding_bottom white-section small change-header-color"
        data-bgcolor="#fff"
      >
        <h5 className="has-mask">{t("About Us")}</h5>
        {data.map((ele) => (
          <>
            <h1 className="has-mask">
              {i18n.language === "en" ? ele.TitleEn : ele.Title}
            </h1>

            <p className="has-animation bigger" data-delay={400}>
              {i18n.language === "en" ? ele.ContentEn : ele.Content}
            </p>
            <ul></ul>
          </>
        ))}
      </div>
    </>
  );
}
