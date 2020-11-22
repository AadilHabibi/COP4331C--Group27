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
import PaperInput from "../../components/PaperInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

import AuthService from "../../services/AuthService";
import { Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(16).required(),
  gender: yup.string().required(),
});

function Signup() {
  const { handleSubmit, errors, register, control } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState({
    msg: "",
    severity: "",
  });
  const history = useHistory();
  const onSubmit = (data) => {
    console.log(data);
    AuthService.register(data)
      .then((res) => {
        console.log(res);
        setStatus({
          msg: res,
          severity: "success",
        });
        setOpen(true);
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
        setStatus({
          msg: err.response.data,
          severity: "error",
        });
        setOpen(true);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div className="signup-container">
      <div>
        <Typography
          variant="h4"
          style={{ color: "#fb5b5a", fontWeight: "bolder" }}
        >
          Signup
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PaperInput
            child={
              <input
                name="name"
                ref={register}
                placeholder="Full Name..."
                className="styled-input"
              ></input>
            }
          />
          <Typography style={{ color: "red" }}>
            {errors.name?.message}
          </Typography>
          <PaperInput
            child={
              <input
                name="email"
                ref={register}
                placeholder="Email..."
                className="styled-input"
              ></input>
            }
          />
          <Typography style={{ color: "red" }}>
            {errors.email?.message}
          </Typography>
          <PaperInput
            child={
              <input
                name="password"
                ref={register}
                placeholder="Password..."
                className="styled-input"
                type="password"
              ></input>
            }
          />
          <Typography style={{ color: "red" }}>
            {errors.password?.message}
          </Typography>
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
          <Typography style={{ color: "red" }}>
            {errors.gender?.message}
          </Typography>
          <PaperInput
            child={
              <input
                ref={register}
                type="submit"
                value="Create Account"
                className="login-btn"
              ></input>
            }
          />
        </form>
        <a
          style={{ cursor: "pointer", fontSize: "large" }}
          onClick={() => history.push("/login")}
        >
          Already have an account?
        </a>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status.severity}>
          {status.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signup;
