import React from "react";
import { useTranslation } from "react-i18next";

export default function FAQ({ data }) {
  const { t, i18n } = useTranslation();
  return (
    <>
      {data.map((ele, i) =>
        i % 2 == 0 ? (
          <>
            <div
              className="vc_row row_padding_top row_padding_bottom white-section small change-header-color"
              data-bgcolor="#fff"
            >
              <h5 className="has-mask">FAQ</h5>
              <h1 className="has-mask">
                {i18n.language === "en" ? ele.QuestionTextEn : ele.QuestionText}
              </h1>
              {/* <p className="has-animation bigger" data-delay={400}>
              {i18n.language === "en" ? ele.ContentEn : ele.Content}
            </p> */}
              <p className="has-animation bigger" data-delay={400}>
                {i18n.language === "en" ? ele.AnswerEn : ele.Answer}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="vc_row row_padding_top small" data-bgcolor="#fff">
              <h5 className="has-mask">FAQ</h5>
              <h1 className="has-mask">
                {i18n.language === "en" ? ele.QuestionTextEn : ele.QuestionText}
              </h1>
              {/* <p className="has-animation bigger" data-delay={400}>
              {i18n.language === "en" ? ele.ContentEn : ele.Content}
            </p> */}
              <p className="has-animation bigger" data-delay={400}>
                {i18n.language === "en" ? ele.AnswerEn : ele.Answer}
              </p>
            </div>
          </>
        )
      )}
    </>
  );
}
