import React from "react";
import video from "../../../assets/avrg.mp4";
import { useTranslation } from "react-i18next";
export default function Header({ data }) {
  const { t, i18n } = useTranslation();
  return (
    <>
      <div id="hero" className="has-image autoscroll">
        <div id="hero-styles">
          {data.map((ele) => (
            <>
              <div
                id="hero-caption"
                className="reverse-parallax-onscroll text-center"
              >
                <div className="inner text-center">
                  <h2 className="text-center" style={{ color: "#fbff05" }}>
                    {i18n.language === "en" ? ele.TitleEn : ele.Title}
                  </h2>
                  <h4 className="text-center">
                    {i18n.language === "en" ? ele.ContentEn : ele.Content}
                  </h4>
                  <br /> <img src="herofooterdark.png" alt="" />
                </div>
              </div>
            </>
          ))}

          <div id="hero-footer">
            <div className="hero-footer-left">
              <div className="button-wrap left disable-drag scroll-down">
                <div className="icon-wrap parallax-wrap">
                  <div className="button-icon parallax-element">
                    <i className="fa fa-angle-down" />
                  </div>
                </div>
                <div className="button-text sticky left">
                  <span data-hover="Scroll or drag to navigate">
                    Scroll or drag to navigate
                  </span>
                </div>
              </div>
            </div>
            <div className="hero-footer-right">
              <div
                id="share"
                className="page-action-content disable-drag"
                data-text="Share:"
              />
            </div>
          </div>
        </div>
      </div>{" "}
      <div id="hero-image-wrapper">
        <div id="hero-background-layer" className="parallax-scroll-effect">
          <div
            id="hero-bg-image"
            style={{ backgroundImage: "url(images/04hero.jpg)" }}
          >
            <div className="hero-video-wrapper">
              <video loop muted className="bgvid">
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
