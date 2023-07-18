import React from "react";
import { Route, Switch } from "react-router-dom";
import AdminLayout from "./AdminLayout";

import { useDispatch } from "react-redux";
import { layout } from "./Routes";

function AdminAuth() {
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Switch>
        <Route path={layout} component={AdminLayout} />
      </Switch>
    </div>
  );
}

export default AdminAuth;
