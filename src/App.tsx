import React from "react";
import { TokenClass } from "typescript";
import LoginPage from "./components/Login/LoginPage";
import Signup from './components/Login/Signup'


type AppState = {
  token: string,
};

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      token: "",
    };
  }

	updateToken = (token: string) => {

		localStorage.setItem('token', token);
		this.setState({token: token});
		console.log(token);
	};

  render() {
    return (
      <div>
        {/* I would like for the login page to be the first thing that appears when you navigate to it, showing no other information. I need to figure out how to set it up so that upon authentication (and authorization, based on user role) you are directed to the LandingPage where you can view user, project, and asset tables. */}
        <div>
          <LoginPage 
          updateToken={this.updateToken}
          />
        </div>
      </div>
    );
  }
}

export default App;
