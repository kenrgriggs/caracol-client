import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import {
  Button,
  Grid,
  Paper,
  Box,
} from "@material-ui/core";

export interface AuthProps {
  updateToken: Function;
}

export interface AuthState {
  showLogin: boolean;
}

class Auth extends React.Component<AuthProps, AuthState> {
  constructor(props: AuthProps) {
    super(props);
    this.state = {
      showLogin: true,
    };
  }

  handleToggle = () => {
    this.setState({
      showLogin: !this.state.showLogin,
    });
  };

  render() {
    return (
      <div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Grid container item md={4} xs={12} lg={3} spacing={2}>
            <Paper style={{ padding: "16px" }} elevation={8}>
              {this.state.showLogin === true ? (
                  <div>
                <Login updateToken={this.props.updateToken} />
                <Button onClick={this.handleToggle}>Signup</Button>
                </div>
              ) : (
                  <div>
                <Signup updateToken={this.props.updateToken} />
                <Button onClick={this.handleToggle}>Login</Button>
                </div>
              )}
            </Paper>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Auth;
