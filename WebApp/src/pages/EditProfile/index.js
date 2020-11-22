import React from "react";
import "./EditProfile.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Typography } from "@material-ui/core";
import PaperInput from "../../components/PaperInput";
import AuthService from "../../services/AuthService";
import { Snackbar, makeStyles } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory,Redirect } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required(),
  confirm_password: yup.string().min(8).max(16).required(),
});
function EditProfile() {
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const [status, setStatus] = React.useState({
    msg: "",
    severity: "",
  });
  const onEdit = (data) => {
    console.log(data);
    AuthService.editInfo(data)
      .then((res) => {
        console.log(res);
        setStatus({
          msg: res,
          severity: "success",
        });
        setOpen(true);
        history.push("/profile");
      })
      .catch((err) => {
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
  if (!AuthService.isLoggedIn()) return <Redirect to="/login" />;
  return (
    <div className="edit-profile-container">
      <Typography
        variant="h4"
        style={{ color: "#fb5b5a", fontWeight: "bolder" }}
      >
        Edit Your Information
      </Typography>
      <form className="edit-form" onSubmit={handleSubmit(onEdit)}>
        <PaperInput
          child={
            <input
              className="styled-input"
              placeholder="Full Name.."
              name="name"
              type="text"
              ref={register}
            ></input>
          }
        />
        <Typography style={{ color: "red" }}>{errors.name?.message}</Typography>
        <PaperInput
          child={
            <input
              className="styled-input"
              placeholder="Password"
              name="password"
              type="password"
              ref={register}
            ></input>
          }
        />
        <Typography style={{ color: "red" }}>
          {errors.password?.message}
        </Typography>
        <PaperInput
          child={
            <input
              className="styled-input"
              placeholder="Confirm Password"
              name="confirm_password"
              type="password"
              ref={register}
            ></input>
          }
        />
        <Typography style={{ color: "red" }}>
          {errors.confirm_password?.message}
        </Typography>
        <PaperInput
          child={<input className="login-btn" type="submit"></input>}
        />
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={status.severity}>
          {status.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default EditProfile;
