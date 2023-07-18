import React, { useCallback, useEffect } from "react";
// javascript plugin used to create scrollbars on windows
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Redirect, Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import SideBar from "../components/SlideBar/Sidebar";
import { user_selector } from "../store/AuthReducer";
import { routes } from "./Routes";
import { useTranslation } from "react-i18next";
import { data_selector, getData } from "../store/DataReducer";
import { GetFromLocalStorage } from "../services/localStorageService";
import "../css/paper-dashboard.css";
import Loader from "../components/Loader/Loader";
import "../css/paper-dashboard.css";
const AdminLayout = (props) => {
  let history = useHistory();
  let dispatch = useDispatch();
  const [pages, setPages] = React.useState([]);
  const lookups = useSelector(data_selector);
  const selector = useSelector(user_selector);
  require("../css/paper-dashboard.css");
  const mainPanel = React.useRef(null);
  const location = useLocation();

  const { t, i18n } = useTranslation();
  const roles = useCallback(
    () =>
      lookups?.Roles != null
        ? routes.filter((e) =>
            lookups?.Roles.find((role) => e.key.includes(role))
          )
        : [],
    [lookups?.Roles]
  );
  useEffect(() => {
    if (GetFromLocalStorage() == null) history.push("/log-in");
    else {
      mainPanel.current && (mainPanel.current.scrollTop = 0);
      document.scrollingElement && (document.scrollingElement.scrollTop = 0);
    }
  }, []);
  useEffect(() => {
    lookups != null && setPages(roles());
  }, [lookups]);

  const data = async () => {
    const x = await getData();
    dispatch(x);
  };
  useEffect(() => {
    selector && data();
  }, [selector]);
  return (
    <div className="wrapper">
      <Loader loading={pages.length == 0} />
      <SideBar
        {...props}
        routes={pages}
        bgColor={"black"}
        activeColor={"primary"}
      />
      <div className="main-panel" ref={mainPanel}>
        <Navbar {...props} />

        <Switch>
          {pages.map((prop, key) => {
            // prop.name != 'Logout' ?
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                exact
                key={key}
              />
            );
          })}
          {pages.length > 0 && (
            <Redirect to={pages[0].layout + pages[0].path} />
          )}
        </Switch>
      </div>
    </div>
  );
};

export default AdminLayout;
