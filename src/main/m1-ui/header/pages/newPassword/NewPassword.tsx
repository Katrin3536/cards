import React from "react";
import {
  Button,
  FormControl,
  FormGroup,
  Grid,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../m2-bll/store";
import style from "./NewPassword.module.css";
import { Navigate, useParams } from "react-router-dom";
import { createNewPassTC } from "../../../../m2-bll/reducers/forgotPass-reducer";

export const NewPassword = () => {
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
      } else if (values.password.length <= 2) {
        errors.password = "Invalid values => less then 3 symbols";

        return errors;
      }
    },

    onSubmit: (values) => {
      formik.resetForm();
      dispatch(createNewPassTC(values.password, token.token));
    },
  });

  if (passIsChanged) {
    return <Navigate to="/Profile" />;
  }

  return (
    <>
      {status === "loading" && <LinearProgress />}{" "}
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
                <TextField
                  label="Password"
                  margin="normal"
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
