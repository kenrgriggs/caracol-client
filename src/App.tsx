import React from "react";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import Auth from "./components/Auth/Auth";
// import LandingPage from './components/LandingPage'

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
          {/* <LandingPage /> */}
        </Router>
      </div>
    );
  }
}

export default App;
