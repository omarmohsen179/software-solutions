import React from "react";
import "./NavigationBar.css";
import logo from "../../assets/2 (1).png";
import logo_white from "../../assets/1 (1).png";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
function NavigationBar() {
  const { t, i18n } = useTranslation();
  const handleButtonClick = (sectionId) => {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
  };
  const [langue, setlangue] = useState("AR");
  useEffect(() => {
    setlangue(i18n.language === "en" ? "Ar" : "En");
  }, [i18n.language]);
  const changeLanguage = useCallback(
    (e) => {
      //   setlangue(i18n.language === "en" ? "Ar" : "En");
      i18n.changeLanguage(i18n.language === "en" ? "ar" : "en");
    },
    [i18n]
  );
  return (
    <header className="classic-menu">
      <div id="header-container">
        {/* Logo */}
        <div id="logo" className="hide-ball">
          <a className="ajax-link" data-type="page-transition" href="index.htm">
            <img className="black-logo" src={logo} alt="Custom solution" />
            <img
              className="white-logo"
              src={logo_white}
              alt="Custom solution"
            />
          </a>
        </div>
        {/*/Logo */}
        {/* Navigation */}
        <nav>
          <div className="nav-height">
            <div className="outer">
              <div className="inner">
                <ul data-breakpoint={1025} className="flexnav">
                  <li className="link menu-timeline">
                    <a
                      className="ajax-link"
                      data-type="page-transition"
                      href="#/home"
                      onClick={() => handleButtonClick("hero")}
                    >
                      <div className="before-span">
                        <span data-hover="Home">Home</span>
                      </div>
                    </a>
                  </li>
                  <li className="link menu-timeline">
                    <a
                      className="ajax-link"
                      data-type="page-transition"
                      href="#/home"
                      onClick={() => handleButtonClick("hero")}
                    >
                      <div className="before-span">
                        <span data-hover="About us">About us</span>
                      </div>
                    </a>
                  </li>
                  <li className="link menu-timeline">
                    <a
                      className="ajax-link"
                      data-type="page-transition"
                      href="#/home"
                    >
                      <div className="before-span">
                        <span data-hover="FAQ">FAQ</span>
                      </div>
                    </a>
                  </li>{" "}
                  <li className="link menu-timeline">
                    <a
                      className="ajax-link"
                      data-type="page-transition"
                      href="#/home"
                      onClick={() => handleButtonClick("contact")}
                    >
                      <div className="before-span">
                        <span data-hover="Contact Us">Contact Us</span>
                      </div>
                    </a>
                  </li>
                  <li className="link menu-timeline">
                    <a
                      className="ajax-link"
                      data-type="page-transition"
                      href="#/home"
                    >
                      <div className="before-span">
                        <span data-hover="Support">Support</span>
                      </div>
                    </a>
                    <ul>
                      <li>
                        <a
                          className="ajax-link active"
                          href="#/home"
                          data-type="page-transition"
                        >
                          WhatsApp
                        </a>
                      </li>
                      <li>
                        <a
                          className="ajax-link"
                          href="mailto:info@CustomSolutions.com"
                          data-type="page-transition"
                        >
                          Send Email
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/* <li className="link menu-timeline">
                    <a
                      className="ajax-link"
                      data-type="page-transition"
                      href="#/home"
                      onClick={() => handleButtonClick("contact")}
                    >
                      <div className="before-span">
                        <span onClick={changeLanguage} data-hover={langue}>
                          {langue}
                        </span>
                      </div>
                    </a>
                  </li> */}
                  {/* <li className="menu-timeline buy-item">
                    <a className="link " href="contact.html">
                      <div className="before-span">
                        <span data-hover="Start now!">
                          <img src="uk%20%281%29.png" alt="" /> Let's talk
                        </span>{" "}
                      </div>
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </nav>
        {/*/Navigation */}
        {/* Menu Burger */}
        <div className="button-wrap right menu disable-drag">
          <div className="icon-wrap parallax-wrap">
            <div className="button-icon parallax-element">
              <div id="burger-wrapper">
                <div id="menu-burger">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
          <div className="button-text sticky right">
            <span data-hover="Menu">Menu</span>
          </div>
        </div>
        {/*/Menu Burger */}
      </div>
    </header>
  );
}

export default NavigationBar;
