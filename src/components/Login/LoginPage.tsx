import React, { Component } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";

export interface LoginProps {
    updateToken: any;
    token: string;
    adminStatus: boolean;
}
 
export interface LoginState {
    email: string;
    password: string;
    history: string;
    errorStatus: boolean;
}


class Login extends Component {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            history: '',
            errorStatus: false
        };
    }

    setEmail = (e: any) => {
        this.setState({email: e.target.value});
      }
    
    setPassword = (e: any) => {
        this.setState({password: e.target.value});
      }
      
  render() {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Grid container item md={4} xs={12} lg={3} spacing={2}>
          <Paper style={{ padding: "16px" }} elevation={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" align="center">
                  Login
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  placeholder="Email"
                  fullWidth
                  name="email"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="password"
                  placeholder="Password"
                  fullWidth
                  name="password"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="button-block"
                >
                  Login
                </Button>
              </Grid>
                <Button
                  type="submit"
                >
                  or Signup
                </Button>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    );
  }
}

export default Login;
