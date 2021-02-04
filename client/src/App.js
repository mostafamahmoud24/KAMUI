import React from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./components/profile";
import Logout from "./components/logout";
import { getCookie } from "./utils/cookies";

const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (getCookie("jwt")) {
      next();
    }
    next.redirect("/login");
  } else {
    next();
  }
};

console.log(getCookie("jwt"));

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GuardProvider guards={[requireLogin]}>
          <Switch>
            <GuardedRoute path="/" exact component={Home}></GuardedRoute>
            <GuardedRoute path="/login" exact component={Login}></GuardedRoute>
            <GuardedRoute
              path="/profile"
              exact
              component={Profile}
              meta={{ auth: true }}
            ></GuardedRoute>
            <GuardedRoute
              path="/logout"
              exact
              component={Logout}
            ></GuardedRoute>
          </Switch>
        </GuardProvider>
      </BrowserRouter>
    </Provider>
  );
}
