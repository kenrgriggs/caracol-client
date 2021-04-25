import React from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  // FormControl,
  // InputLabel,
  // MenuItem,
  // Select,
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

// This regular expression evaluates whether or not the email is in valid email address format
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

  // This function tracks changes to input text fields in the login/signup form
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
    // console.log(this.state.errors);
  };

  // This function submits info entered in the form on button click
  handleSubmit = (event: any) => {
    event.preventDefault();
    let validity = true;
    Object.values(this.state.errors).forEach(
      (val) => val.length > 0 && (validity = false)
    );
    if (validity === true) {
      // console.log("Registering can be done");
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
          this.props.updateToken(data.sessionToken);
          console.log(data);
        });
    } else {
      // console.log("You cannot be registered!");
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <Grid container spacing={2}>
          {/* TITLE */}
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Signup
            </Typography>
          </Grid>

          {/* SIGNUP FORM  */}
          <form onSubmit={this.handleSubmit} noValidate>
            {/* FIRST NAME FIELD  */}
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

            {/* LAST NAME FIELD  */}
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

            {/* USERNAME FIELD  */}
            <Grid item xs={12}>
              <TextField
                onChange={this.handleChange}
                type="text"
                placeholder="Username"
                autoComplete="username"
                fullWidth
                name="username"
                variant="outlined"
                required
              />
              {errors.username.length > 4 && (
                <span style={{ color: "red" }}>{errors.username}</span>
              )}
            </Grid>

            {/* EMAIL FIELD  */}
            <Grid item xs={12}>
              <TextField
                onChange={this.handleChange}
                type="text"
                placeholder="Email"
                autoComplete="email"
                fullWidth
                name="email"
                variant="outlined"
                required
              />
              {errors.email.length > 0 && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
            </Grid>

            {/* PASSWORD FIELD  */}
            <Grid item xs={12}>
              <TextField
                onChange={this.handleChange}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                fullWidth
                name="password"
                variant="outlined"
                required
              />
              {errors.password.length > 0 && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </Grid>

            {/* USER ROLE FIELD  */}


            {/* <FormControl variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">
                Role
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={this.handleChange}
                label="Role"
              >
                <MenuItem value=" ">
                  <em></em>
                </MenuItem>
                <MenuItem value={10}>Admin</MenuItem>
                <MenuItem value={20}>Technician</MenuItem>
                <MenuItem value={30}>Manager</MenuItem>
              </Select>
            </FormControl> */}



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
            </Grid>

            {/* SUBMIT BUTTON  */}
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
          </form>
        </Grid>
      </div>
    );
  }
}

export default Signup;
