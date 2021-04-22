import React from "react";
import Signup from "./Signup";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,

  // InputLabel,
  // NativeSelect,
} from "@material-ui/core";

import {
  // BrowserRouter as Router,
  // Switch,
  // Route,
  Link,
  // useParams,
} from "react-router-dom";

export interface LoginProps {
  name?: any;
  value?: any;
  updateToken: Function;
}

export interface LoginState {
  username: string;
  password: string;
  // showLogin: boolean
  errors: {
    username: string;
    password: string;
  };
}

class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    const initialState = {
      username: "",
      password: "",
      // showLogin: true,
      errors: {
        username: "",
        password: "",
      },
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  //   handleToggle = () => {
  //     this.setState({
  //         showLogin: !this.state.showLogin
  //     })
  // }

  handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "username":
        errors.username =
          value.length < 5 ? "Username must be 5 characters long!" : "";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be eight characters long!" : "";
        break;
      default:
        break;
    }
    this.setState(Object.assign(this.state, { errors, [name]: value }));
    console.log(this.state.errors);
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    let validity = true;
    Object.values(this.state.errors).forEach(
      (val) => val.length > 0 && (validity = false)
    );
    if (validity === true) {
      console.log("Registering can be done");

      fetch(`http://localhost:3000/user/login`, {
        method: "POST",
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // this.props.setIsLoggedIn(true);
          this.props.updateToken(data.sessionToken);
          console.log(data);
          // this.props.updateUsername(data.user.username);
        });
    } else {
      console.log("You cannot be registered!");
    }
  };

  signup = () => {};

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Login
            </Typography>
          </Grid>
          {/* <form> */}
          <form onSubmit={this.handleSubmit} noValidate>
            {/* <Grid item xs={12}>
                    <TextField
                      onChange={this.handleChange}
                      type="text"
                      placeholder="First Name"
                      fullWidth
                      name="firstname"
                      variant="outlined"
                      required
                    />
                  </Grid> */}
            {/* <Grid item xs={12}>
                    <TextField
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Last Name"
                      fullWidth
                      name="lastname"
                      variant="outlined"
                      required
                    />
                    {errors.username.length > 0 && (
                      <span style={{ color: "red" }}>{errors.username}</span>
                    )}
                  </Grid> */}
            {/* <Grid item xs={12}>
                    <TextField
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Email"
                      fullWidth
                      name="email"
                      variant="outlined"
                      required
                    />
                    {errors.email.length > 0 && (
                      <span style={{ color: "red" }}>{errors.email}</span>
                    )}
                  </Grid> */}
            <Grid item xs={12}>
              <TextField
                onChange={this.handleChange}
                type="text"
                name="username"
                autoComplete="username"
                placeholder="Username"
                fullWidth
                variant="outlined"
                required
              />
              {errors.username.length > 4 && (
                <span style={{ color: "red" }}>{errors.username}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={this.handleChange}
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                fullWidth
                variant="outlined"
                required
              />
              {errors.password.length > 0 && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </Grid>
            {/* <Grid item xs={12}>
                    <InputLabel>Authorization</InputLabel>
                    <NativeSelect
                      onChange={this.handleChange}
                      inputProps={{
                        name: "Authorization",
                        id: "Authorization",
                      }}
                    >
                      <option value={10}>Technician</option>
                      <option value={20}>Manager</option>
                    </NativeSelect>
                  </Grid> */}
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
          </form>
        </Grid>
      </div>
    );
  }
}

export default Login;
