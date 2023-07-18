import React from "react";

import { BackTop } from "antd";
import img2 from "../../assets/law-logo.png";
function AppFooter({ data }) {
  return (
    <footer className="hidden">
      <div id="footer-container">
        <div id="backtotop" className="button-wrap left disable-drag">
          <div className="icon-wrap parallax-wrap">
            <div className="button-icon parallax-element">
              <i className="fa fa-angle-up" />
            </div>
          </div>
          <div className="button-text sticky left">
            <span data-hover="Back Top">Back Top</span>
          </div>
        </div>
        <div className="footer-middle">
          <div className="copyright">
            2021-2022 ©{" "}
            <a
              className="link"
              // href="index.htm"
            >
              Custom Solution Administration (Custom Solutions) LTD.
            </a>{" "}
            All rights reserved.
            <br />
            <small>
              Made with love in partnership with{" "}
              <a
              // href="https://shetewy-tech.com"
              >
                Shetewy-Tech
              </a>
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
