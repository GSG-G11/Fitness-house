import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import PropTypes from "prop-types";

function PasswordInput({ form, label }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <TextField
        sx={{ mt: 3, width: "350px" }}
        label={
          label === "password"
            ? " ادخل كلمة المرور"
            : " ادخل كلمة المرور الجديدة"
        }
        type={showPassword ? "text" : "password"}
        name={label}
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
        value={form.values[label]}
        onChange={form.handleChange}
        error={!!form.errors[label]}
        helperText={form.errors[label]}
        autoComplete="current-password"
        variant="outlined"
      />
    </div>
  );
}
PasswordInput.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
};
PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
};
export default PasswordInput;
