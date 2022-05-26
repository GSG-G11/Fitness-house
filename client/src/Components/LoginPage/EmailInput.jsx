import React from "react";
import { Email } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import PropTypes from "prop-types";

function EmailInput({ form }) {
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
      value={form.values.email}
      onChange={form.handleChange}
      error={!!form.errors.email}
      autoComplete="email"
      helperText={form.errors.email}
      variant="outlined"
    />
  );
}
EmailInput.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
};
export default EmailInput;
