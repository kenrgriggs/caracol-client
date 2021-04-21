import React from "react";
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Box,
  InputLabel,
  NativeSelect,
} from "@material-ui/core";

export interface SignupProps {
  name?: any;
  value?: any;
  updateToken: Function;
}

export interface SignupState {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  role: string;
  errors: {
    username: string;
    email: string;
    password: string;
  };
}

const Regex = RegExp(
  /^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i
);

class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    const initialState = {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      role: "",
      errors: {
        username: "",
        email: "",
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
      case "email":
        errors.email = Regex.test(value) ? "" : "Email is not valid!";
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
      fetch(`http://localhost:3000/user/register`, {
        method: "POST",
        body: JSON.stringify({
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          role: this.state.role,
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

  render() {
    const { errors } = this.state;
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
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h5" align="center">
                    Signup
                  </Typography>
                </Grid>
                {/* <form> */}
                <form onSubmit={this.handleSubmit} noValidate>
                  <Grid item xs={12}>
                    <TextField
                      onChange={this.handleChange}
                      type="text"
                      placeholder="First Name"
                      fullWidth
                      name="firstname"
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Username"
                      fullWidth
                      name="username"
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
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={this.handleChange}
                      type="password"
                      placeholder="Password"
                      fullWidth
                      name="password"
                      variant="outlined"
                      required
                    />
                    {errors.password.length > 0 && (
                      <span style={{ color: "red" }}>{errors.password}</span>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={this.handleChange}
                      type="text"
                      placeholder="Role"
                      fullWidth
                      name="role"
                      variant="outlined"
                      required
                    />
                    {/* {errors.password.length > 0 && (
                      <span style={{ color: "red" }}>{errors.password}</span>
                    )} */}
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
                      Signup
                    </Button>
                  </Grid>
                  <Button type="submit">or Login</Button>
                </form>
              </Grid>
            </Paper>
          </Grid>
        </Box>
      </div>
    );
  }
}

export default Signup;
