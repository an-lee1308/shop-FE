import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import client from "./client";
import admin from "./pages/admin/admin";
import * as action from "./actions/user";

function App() {
  const token = localStorage.getItem("Authorization");
  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(action.getApiUser());
    }
  });
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={admin} />
        <Route path="/" component={client} />
      </Switch>
    </Router>
  );
}

export default App;
