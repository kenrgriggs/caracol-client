import React from "react";
// import {
//   BrowserRouter as Router,
//   Redirect,
//   Switch,
//   Route,
//   Link,
// } from "react-router-dom";
import Auth from "./components/Auth/Auth";
// import Login from "./components/Auth/Login";
// import Signup from './components/Auth/Signup'
import LandingPage from "./components/LandingPage";
// import Protector from './components/Auth/Protector'

// Delcare type 'AppState'
// Give attribute token as string
type AppState = {
  // isLoggedIn: string,
  // user: {};
  token: string;
  isAdmin: boolean;
};

// No idea what 'React.Component<{}, AppState>' is for.
class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      // isLoggedIn: "NOT_LOGGED_IN",
      // user: {},
      token: "",
      isAdmin: false,
    };
  }

  updateToken = (token: string, updateAdmin: boolean) => {
    // Save token to local storage
    localStorage.setItem("token", token);
    // set token to current state
    this.setState({ token: token });
    this.setState({ isAdmin: updateAdmin });
    console.log(token);
    console.log(updateAdmin)
  };

  requireLogin = (to: any, from: any, next: any) => {
    if (to.meta.admin) {
      if (this.state.isAdmin === true) {
        next();
      }
      next.redirect("/user/login");
    } else if (to.meta.auth) {
      if (this.state.token) {
        next();
      }
      next.redirect("/user/login");
    } else {
      next();
    }
  };

  loggedIn = () => {
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem("token") === "") {
      return false;
    } else if (localStorage.getItem("token") === "undefined"){
      return false;
    } else if (localStorage.getItem("token")){
      return true;
    }
  };

  render() {
    return (
      <div>
              {this.loggedIn() ? (
                <LandingPage />
              ) : (
                <Auth updateToken={this.updateToken} />
              )}
      </div>
    );
  }
}

export default App;
