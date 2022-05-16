/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { TextField, InputAdornment, Button, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { handleNext } from "../../../../Store/Slices";

import "./style.css";

const Input = styled("input")({
  display: "none",
});

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export default function LoginInformation({ loginInformationfForm }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useDispatch();

  return (
    <form
      className="form__container"
      onSubmit={loginInformationfForm.handleSubmit}
    >
      <TextField
        sx={{ mt: 1, width: "500px" }}
        id="outlined-basic"
        label="اسم النادي"
        name="name"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
        value={loginInformationfForm.values.name}
        onChange={loginInformationfForm.handleChange}
        error={!!loginInformationfForm.errors.name}
        helperText={loginInformationfForm.errors.name}
        variant="outlined"
      />

      <TextField
        sx={{ mt: 1, width: "500px" }}
        id="outlined-basic"
        label="أدخل البريد الإلكتروني"
        name="email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        value={loginInformationfForm.values.email}
        onChange={loginInformationfForm.handleChange}
        error={!!loginInformationfForm.errors.email}
        helperText={loginInformationfForm.errors.email}
        variant="outlined"
      />

      <TextField
        sx={{ mt: 1, width: "500px" }}
        id="outlined-basic"
        label="أدخل كلمة السر"
        type={showPassword ? "text" : "password"}
        name="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleClickShowPassword}>
              {showPassword ? (
                <VisibilityOff sx={{ cursor: "pointer" }} />
              ) : (
                <Visibility sx={{ cursor: "pointer" }} />
              )}
            </InputAdornment>
          ),
        }}
        value={loginInformationfForm.values.password}
        onChange={loginInformationfForm.handleChange}
        error={!!loginInformationfForm.errors.password}
        helperText={loginInformationfForm.errors.password}
        variant="outlined"
      />
      <label
        htmlFor="icon-button-file"
        error={!!loginInformationfForm.errors.image}
        helperText={loginInformationfForm.errors.image}
      >
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          name="image"
          onChange={async (event) => {
            const imageBase = await convertToBase64(
              event.currentTarget.files[0]
            );
            loginInformationfForm.setFieldValue("image", imageBase);
            console.log(event.currentTarget.files[0]);
          }}
        />
        <Button
          variant="outlined"
          component="span"
          sx={{
            mt: 1,
            height: "3.3rem",
            width: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          <PhotoCamera sx={{ mr: 1 }} />
          ادخل الشعار
        </Button>

        {loginInformationfForm.values.image && (
          <Avatar
            src={loginInformationfForm.values.image}
            sx={{
              mt: 1,
              height: 100,
              width: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
            }}
            alt="imageProfile"
          />
        )}
      </label>

      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 1, height: "3.3rem", width: "500px" }}
        onClick={() => {
          dispatch(handleNext());
        }}
      >
        الخطوة التالية
      </Button>
    </form>
  );
}
LoginInformation.propTypes = {
  loginInformationfForm: PropTypes.instanceOf(Object).isRequired,
};
