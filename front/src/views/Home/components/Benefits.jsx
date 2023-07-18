import React from "react";
import { useTranslation } from "react-i18next";

export default function Benefits({ data }) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div className="vc_row row_padding_top small" data-bgcolor="#fff">
        <h5 className="has-mask">{t("Benefits")}</h5>
        {data.map((ele) => (
          <>
            <h1 className="has-mask">
              {i18n.language === "en" ? ele.TitleEn : ele.Title}
            </h1>
            <p className="has-animation bigger" data-delay={400}></p>
            <ul className="has-animation bigger" data-delay={400}>
              {i18n.language === "en" ? ele.DescriptionEn : ele.Description}
            </ul>
          </>
        ))}
      </div>
    </>
  );
}
