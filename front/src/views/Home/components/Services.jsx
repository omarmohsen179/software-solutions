import React from "react";

import { useTranslation } from "react-i18next";
import { ApiBaseUrl } from "../../../services/config";
export default function Services({ data }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="vc_row full has-animation" data-delay={100}>
      <div id="justified-grid">
        {data.map((ele) => {
          return (
            <div className="collage-thumb jg-entry entry-visible">
              <a>
                <img
                  src={ApiBaseUrl + ele?.ImagePath.replaceAll("\\", "/")}
                  alt="img"
                />
                <div className="thumb-info" style={{ fontSize: "17px" }}>
                  {i18n.language === "en" ? ele.TitleEn : ele.Title}
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
