import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  TextField,
  InputAdornment,
  Button,
  FormHelperText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import convertToBase64 from "../../../../utils";

import "./style.css";

const Input = styled("input")({
  display: "none",
});

export default function LoginInformation({ loginInformationForm }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      className="form__container"
      onSubmit={loginInformationForm.handleSubmit}
    >
      <TextField
        sx={{ mt: 3, width: "500px" }}
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
        value={loginInformationForm.values.name}
        onChange={loginInformationForm.handleChange}
        error={!!loginInformationForm.errors.name}
        helperText={loginInformationForm.errors.name}
        variant="outlined"
      />

      <TextField
        sx={{ mt: 3, width: "500px" }}
        label="أدخل البريد الإلكتروني"
        name="email"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        value={loginInformationForm.values.email}
        onChange={loginInformationForm.handleChange}
        error={!!loginInformationForm.errors.email}
        helperText={loginInformationForm.errors.email}
        variant="outlined"
      />

      <TextField
        sx={{ mt: 3, width: "500px" }}
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
        value={loginInformationForm.values.password}
        onChange={loginInformationForm.handleChange}
        error={!!loginInformationForm.errors.password}
        helperText={loginInformationForm.errors.password}
        autoComplete="new-password"
        variant="outlined"
      />
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          type="file"
          id="icon-button-file"
          name="image"
          onChange={async (event) => {
            const imageBase = await convertToBase64(
              event.currentTarget.files[0]
            );
            loginInformationForm.setFieldValue("image", imageBase);
          }}
        />
        <Button
          variant="outlined"
          component="span"
          sx={{
            mt: 3,
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
        <FormHelperText id="component-error-text" error>
          {loginInformationForm.errors.image}
        </FormHelperText>
        {loginInformationForm.values.image && (
          <img
            src={loginInformationForm.values.image}
            className="preview_img"
            alt="imageProfile"
          />
        )}
      </label>

      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 3, height: "3.3rem", width: "500px" }}
      >
        الخطوة التالية
      </Button>
    </form>
  );
}
LoginInformation.propTypes = {
  loginInformationForm: PropTypes.instanceOf(Object).isRequired,
};
