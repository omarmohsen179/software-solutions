import "devextreme/dist/css/dx.light.css";
import { useTranslation } from "react-i18next";
import { Redirect, Route, Switch } from "react-router-dom";

import "../App.css";
import NavigationBar from "../components/NavigationBar/Navbarexception";
import WebLoading from "../components/WebLoading/WebLoading";
import Home from "../views/Home/Home";
import Login from "../views/LogIn/Login";
import AppFooter from "../components/common/footer";

import "../css/user.css";
import ScrollTop from "../components/ScrollTop";
function UserLayout() {
  const { t, i18n } = useTranslation();
  if (i18n.language === "en-US") {
    i18n.init();
    document.documentElement.setAttribute("lang", "en");
    i18n.changeLanguage("en");
  }
  return (
    <>
      {/* <MyClass /> */}
      <main className="user-layout">
        <WebLoading />

        <div className="cd-index cd-main-content">
          <div
            id="page-content"
            className="light-content"
            data-bgcolor="#141414"
          >
            <NavigationBar />
            <div id="content-scroll">
              <div id="main">
                <ScrollTop />
                <Switch>
                  <Route path="/home" exact component={Home} />

                  {/* <Route path="/post/:post" exact component={Posts} />
                  <Route
                    path="/postDetails/:id"
                    exact
                    component={PostDetails}
                  /> */}
                  <Redirect to="/home" />
                </Switch>
              </div>
              <AppFooter />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
export default UserLayout;
