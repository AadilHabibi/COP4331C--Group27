import React, { useState } from "react";
import "./Signup.scss";
import {
  Paper,
  Typography,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
function Signup() {
  const [elevation, setElevation] = useState({
    name: 2,
    email: 2,
    pw: 2,
    signup: 2,
  });
  const { handleSubmit, errors, register, control } = useForm();
  return (
    <div className="signup-container">
      <div>
        <Typography
          variant="h4"
          style={{ color: "#fb5b5a", fontWeight: "bolder" }}
        >
          Signup
        </Typography>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Paper
            style={{ borderRadius: "50px", backgroundColor: "#003f5c" }}
            elevation={elevation.name}
            onMouseEnter={() => setElevation({ ...elevation, name: 10 })}
            onMouseLeave={() => setElevation({ ...elevation, name: 2 })}
          >
            <input
              name="name"
              ref={register}
              placeholder="Full Name..."
              className="styled-input"
            ></input>
          </Paper>

         

          <Paper
            style={{ borderRadius: "50px", backgroundColor: "#003f5c" }}
            elevation={elevation.email}
            onMouseEnter={() => setElevation({ ...elevation, email: 10 })}
            onMouseLeave={() => setElevation({ ...elevation, email: 2 })}
          >
            <input
              name="email"
              ref={register}
              placeholder="Email..."
              className="styled-input"
            ></input>
          </Paper>
          <Paper
            style={{ borderRadius: "50px", backgroundColor: "#003f5c" }}
            elevation={elevation.pw}
            onMouseEnter={() => setElevation({ ...elevation, pw: 10 })}
            onMouseLeave={() => setElevation({ ...elevation, pw: 2 })}
          >
            <input
              name="password"
              ref={register}
              placeholder="Password..."
              className="styled-input"
              type="password"
            ></input>
          </Paper>
          <Controller
            as={
              <RadioGroup row aria-label="gender" name="gender">
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            }
            name="gender"
            control={control}
          ></Controller>
          <Paper
            style={{
              borderRadius: "50px",
              backgroundColor: "#003f5c",
              margin: "20px",
            }}
            elevation={elevation.signup}
            onMouseEnter={() => setElevation({ ...elevation, signup: 10 })}
            onMouseLeave={() => setElevation({ ...elevation, signup: 2 })}
          >
            <input
              ref={register}
              type="submit"
              value="Create Account"
              className="login-btn"
            ></input>
          </Paper>
        </form>

        <a style={{ cursor: "pointer", fontSize: "large" }}>
          Already have an account?
        </a>
      </div>
    </div>
  );
}

export default Signup;
