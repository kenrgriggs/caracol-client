import React, { Component } from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,
} from "@material-ui/core";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              <Grid 
              item xs={12}
              align="right"
              >
                <Button
                  type="submit"
                >
                  or Signup
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Box>
    );
  }
}

export default Login;
