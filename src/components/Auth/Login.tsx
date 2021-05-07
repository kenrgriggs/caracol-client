import React from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";

// IM NOT SURE IF 'name?' AND 'value?' ARE NECESSARY??? 
export interface LoginProps {
  name?: any;
  value?: any;
  updateToken: Function;
}

export interface LoginState {
  username: string;
  password: string;
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
      errors: {
        username: "",
        password: "",
      },
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

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
      // console.log("Registering can be done");

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
          this.props.updateToken(data.sessionToken, data.user.isAdmin);
          console.log(data);
        });
    } else {
      // console.log("You cannot be registered!");
    }
  };

  // signup = () => {};

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
          <form onSubmit={this.handleSubmit} noValidate>
            
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
