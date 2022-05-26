import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, InputAdornment } from "@mui/material";
import PropTypes from "prop-types";

function PasswordInput({ loginForm }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <TextField
        sx={{ mt: 3, width: "350px" }}
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
        value={loginForm.values.password}
        onChange={loginForm.handleChange}
        error={!!loginForm.errors.password}
        helperText={loginForm.errors.password}
        autoComplete="current-password"
        variant="outlined"
      />
    </div>
  );
}
PasswordInput.propTypes = {
  loginForm: PropTypes.instanceOf(Object).isRequired,
};
export default PasswordInput;
