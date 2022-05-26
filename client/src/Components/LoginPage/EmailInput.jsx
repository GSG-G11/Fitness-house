import React from "react";
import { Email } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import PropTypes from "prop-types";

function EmailInput({ loginForm }) {
  return (
    <TextField
      sx={{ mt: 3, width: "350px" }}
      label="أدخل البريد الإلكتروني"
      name="email"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Email />
          </InputAdornment>
        ),
      }}
      value={loginForm.values.email}
      onChange={loginForm.handleChange}
      error={!!loginForm.errors.email}
      autoComplete="email"
      helperText={loginForm.errors.email}
      variant="outlined"
    />
  );
}
EmailInput.propTypes = {
  loginForm: PropTypes.instanceOf(Object).isRequired,
};
export default EmailInput;
