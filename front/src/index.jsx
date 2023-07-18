import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import "animate.css";
import { LanguageProvider } from "./services/LanguageContext";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/ConfigureStore";
ReactDOM.render(
  <HashRouter>
    <LanguageProvider>
      <Provider store={configureStore()}>
        <App />
      </Provider>
    </LanguageProvider>
  </HashRouter>,
  document.getElementById("root")
);
