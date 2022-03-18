import React, { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import "../../views/Auth/auth.css";
import { login } from "../../store/actions/authActions";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const AuthSchema = Yup.object().shape({
    email: Yup.string()
      .email("Неправильный email!")
      .required("Обязательное поле"),
    password: Yup.string()
      .min(6, "Ваш пароль должен содержать минимум 6 символов!")
      .max(16, "Ваш пароль должен содержать максимум 16 символов!")
      .required("Обязательное поле"),
  });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (values) => {
    dispatch(login(values));
  };

  return (
    <Box
      component={"div"}
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validateOnBlur
        validationSchema={AuthSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isValid,
          dirty,
        }) => (
          <form onSubmit={handleSubmit} className="authForm">
            <Typography
              align="center"
              component={"h1"}
              sx={{ fontSize: "40px", color: "blue", marginBottom: "20px" }}
            >
              Войти
            </Typography>
            <TextField
              id="outlined-basic"
              label="Email"
              error={errors.email && touched.email}
              value={values.email}
              className="input"
              name="email"
              onChange={handleChange}
              helperText={errors.email && touched.email ? errors.email : ""}
              onBlur={handleBlur}
              variant="outlined"
              sx={{ backgroundColor: "white", width: "100%" }}
            />

            <FormControl
              sx={{ marginTop: "20px", width: "100%" }}
              variant="outlined"
            >
              <InputLabel
                error={errors.password && touched.password}
                htmlFor="outlined-adornment-password"
              >
                Пароль
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                name="password"
                className="input"
                error={errors.password && touched.password}
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
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
                label="Password"
              />
              {errors.password && touched.password && (
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>
            <Button
              type="submit"
              disabled={!isValid || !dirty}
              variant="outlined"
              sx={{ marginTop: "20px", width: "100%", height: "10%" }}
            >
              Войти
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default Login;
