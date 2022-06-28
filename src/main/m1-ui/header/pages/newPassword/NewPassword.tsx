import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../m2-bll/store";
import style from "./NewPassword.module.css";
import { Navigate, useParams } from "react-router-dom";
import { createNewPassTC } from "../../../../m2-bll/reducers/forgotPass-reducer";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const NewPassword = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const status = useAppSelector((state) => state.app.status);
  const passIsChanged = useAppSelector(
    (state) => state.recoveryPass.passIsChanged
  );
  const token = useParams();

  const dispatch = useAppDispatch();

  type FormikErrorType = {
    password?: string;
  };

  const formik = useFormik({
    initialValues: {
      password: "",
    },

    validate: (values) => {
      const errors: FormikErrorType = {};

      if (!values.password) {
        errors.password = "Required";
      } else if (values.password.length <= 8) {
        errors.password = "Invalid values => less then 8 symbols";
      }
      return errors;
    },

    onSubmit: (values) => {
      formik.resetForm();
      dispatch(createNewPassTC(values.password, token.token));
    },
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  if (passIsChanged) {
    return <Navigate to="/Login" />;
  }

  return (
    <>
      {status === "loading" && <LinearProgress />}
      <div className={style.newPassword}>
        <h3 className={style.title}>it-incubator</h3>
        <h3 className={style.subtitle}>Create new password</h3>
        <Grid
          item
          justifyContent={"center"}
          style={{ marginTop: "30px", maxWidth: "260px", marginBottom: "68px" }}
        >
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormGroup>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red" }}>{formik.errors.password}</div>
                ) : null}
                <span className={style.description}>
                  Create new password and we will send you future instructions
                  to email
                </span>
                <Button
                  type={"submit"}
                  variant={"contained"}
                  color={"primary"}
                  style={{ marginTop: "100px" }}
                  disabled={
                    status === "loading" || formik.errors.password
                      ? true
                      : false
                  }
                >
                  Create new password
                </Button>
              </FormGroup>
            </FormControl>
          </form>
        </Grid>
      </div>
    </>
  );
};
