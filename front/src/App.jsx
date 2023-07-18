import "bootstrap/dist/js/bootstrap.bundle";
import "devextreme/dist/css/dx.light.css";
//import "font-awesome/css/font-awesome.min.css";
import "popper.js/dist/popper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./App.css";
import AdminAuth from "./layout/AdminAuth";
import { layout } from "./layout/Routes";
import UserLayout from "./layout/UserLayout";
import { GetFromLocalStorage } from "./services/localStorageService";
import { auth_loading, userLoginLocalStorage } from "./store/AuthReducer";

import axios from "axios";
import "devextreme/dist/css/dx.light.css";
import { useTranslation } from "react-i18next";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Loader from "./components/Loader/Loader";
import Login from "./views/LogIn/Login";
import { data_all_selector, getDataAll } from "./store/DataReducer";
function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const loading_redux = useSelector(auth_loading);
  useEffect(() => {
    setLoading(loading_redux);
  }, [loading_redux]);
  const { t, i18n } = useTranslation();
  React.useEffect(() => {
    const local = GetFromLocalStorage();
    if (local) {
      axios.defaults.headers.Authorization = `bearer ${local.Token}`;
      dispatch(userLoginLocalStorage(local));
    }
  }, []);
  useEffect(() => {
    if (
      localStorage.getItem("i18nextLng") !== "en" &&
      localStorage.getItem("i18nextLng") !== "ar"
    ) {
      i18n.changeLanguage("en");
    }
  }, [i18n]);
  // const selector = useSelector(data_all_selector);
  // const mainData = async () => dispatch(await getDataAll());
  // useEffect(() => {
  //   mainData();
  // }, []);
  // useEffect(() => {
  //   console.log(selector);
  // }, [selector]);

  return (
    <div lang={i18n.language === "en" ? "en" : "ar"}>
      <Loader loading={loading} />

      <Switch>
        <Route path="/log-in" exact component={Login} />
        <Route path={layout} component={AdminAuth} />
        <Route path="/" component={UserLayout} />
      </Switch>
    </div>
  );
}
export default App;
