import React from "react";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
} from "react-router-dom";
// import { TokenClass } from "typescript";
import Auth from "./components/Auth/Auth";
import Login from "./components/Auth/Login";

// Delcare type 'AppState'
// Give attribute token as string
type AppState = {
  token: string;
};

// No idea what 'React.Component<{}, AppState>' is for.
class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      token: "",
    };
  }

  updateToken = (token: string) => {
    // Save token to local storage
    localStorage.setItem("token", token);
    // set token to current state
    this.setState({ token: token });
    console.log(token);
  };

  render() {
    return (
      <div>
        <Router>
          {/* Render login page first */}
          <Auth updateToken={this.updateToken} />
          {/* Route to signup on button click */}
          {/* <Route path='/user/register'>
          <Signup
          updateToken={this.updateToken}
          />
          </Route> */}
        </Router>
      </div>
    );
  }
}

export default App;
