import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import img2 from "../../assets/law-logo.png";
import { useHistory } from "react-router-dom";
import { Anchor, Drawer, Button } from "antd";
import { user_selector } from "../../store/AuthReducer";
const { Link } = Anchor;

function AppHeader() {
  let history = useHistory();
  const [visible, setVisible] = useState(false);
  const { t, i18n } = useTranslation();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  let selector = useSelector(user_selector);
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
    <div
      className="container-fluid"
      style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
    >
      <div className="header">
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={img2}
            width="100%"
            height={"100%"}
            style={{ width: "70px", cursor: "pointer" }}
            onClick={() => history.push("/home")}
          />
          {i18n.language === "en" ? (
            <div className="main-logo-text">
              <b style={{ color: "#dca74a" }}>Khaled Elewa Office </b>
              <br />
              Center for legal advice and lawyers
            </div>
          ) : (
            <div className="main-logo-text">
              <b style={{ color: "#dca74a" }}>مكتب خالد عليوة </b> <br />
              مركز الاستشارات القانونية والمحاماة
            </div>
          )}
        </div>

        <div className="mobileHidden">
          <Anchor
            style={{ color: "#a5a5a5", overflow: "hidden" }}
            targetOffset="65"
          >
            <Link
              href="#/home#hero"
              className="navbar-text-nav"
              title={t("Home")}
            />

            <Link
              href="#/home#about"
              className="navbar-text-nav"
              title={t("About Us")}
            />

            <Link
              href="#/home#service"
              className="navbar-text-nav"
              title={t("Our Experience")}
            />
            {/*      <Link
              className="navbar-text-nav"
              title={t("News")}
              href="#/post/News"
            />
            <Link
              className="navbar-text-nav"
              title={t("Articles")}
              href="#/post/Articles"
          />*/}
            <Link
              className="navbar-text-nav"
              href="#/home#faq"
              title={t("FAQ")}
            />
            {/*   <Link href="#works" title="How it works" />*/}
            {/*<Link href="#pricing" title="Pricing" />*/}
            <Link
              className="navbar-text-nav"
              href="#/home#contact"
              title={t("Contact Us")}
            />
            <Link
              className="navbar-text-nav nav-add-color"
              href={selector ? "#/dashboard" : "#/log-in"}
              title={selector ? t("Dashboard") : t("Sign In")}
            />
            <div onClick={changeLanguage} className="langue-text">
              {langue}
            </div>
          </Anchor>
        </div>

        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            width={180}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link
                href="#/home#hero"
                className="navbar-text-nav"
                title={t("Home")}
              />

              <Link
                href="#/home#about"
                className="navbar-text-nav"
                title={t("About Us")}
              />

              <Link
                href="#/home#service"
                className="navbar-text-nav"
                title={t("Our Services")}
              />
              <Link
                className="navbar-text-nav"
                title={t("News")}
                href="#/post/News"
              />
              <Link
                className="navbar-text-nav"
                title={t("Articles")}
                href="#/post/Articles"
              />
              <Link
                className="navbar-text-nav"
                href="#/home#faq"
                title={t("FAQ")}
              />
              {/*   <Link href="#works" title="How it works" />*/}
              {/*<Link href="#pricing" title="Pricing" />*/}
              <Link
                className="navbar-text-nav"
                href="#/home#contact"
                title={t("Contact Us")}
              />
              <Link
                href={selector ? "#/dashboard" : "#/log-in"}
                title={selector ? t("Dashboard") : t("Sign In")}
              />
            </Anchor>
            <div
              onClick={changeLanguage}
              style={{ padding: 0 }}
              className="langue-text"
            >
              {langue}
            </div>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default AppHeader;
