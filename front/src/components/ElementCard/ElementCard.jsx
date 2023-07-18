import React from "react";
import { useTranslation } from "react-i18next";
import placeholder from "../../assets/aa.jpg";
import { ApiBaseUrl } from "../../services/config";
import "./ElementCard.css";
export default function ElementCard({
  ImagePath,
  Title,
  TitleEn,
  Description,
  DescriptionEn,
  FullWidth,
  Id,
  onClick = null,
  category = false,
}) {
  const { t, i18n } = useTranslation();

  //https://localhost:5001/\Uplode\afd3167e-ec90-45d7-ab1c-a372fee3b47e.jpeg
  return (
    <div className={"block_wrap " + (FullWidth ? "full" : "half")}>
      <div className="block_cont">
        <div className=" card-content">
          <a>
            <img
              className="back-image"
              src={ApiBaseUrl + ImagePath?.replaceAll("\\", "/")}
              sizes="100vw, 80vw"
            />
          </a>

          <div
            onClick={onClick}
            className={
              "info_cont " + (category ? "on-hover-black" : "on-hover-unblack")
            }
            style={{
              cursor: "pointer",
            }}
          >
            <div
              style={{ margin: "auto", cursor: "pointer" }}
              className="content-text"
            >
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: "600",
                  cursor: "pointer",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                {i18n.language === "ar" ? Title : TitleEn}
              </h1>
              <div>{i18n.language === "ar" ? Description : DescriptionEn}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
