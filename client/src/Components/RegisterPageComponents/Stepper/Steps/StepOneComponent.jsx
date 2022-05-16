/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
// import { useDispatch } from "react-redux";

import { TextField, InputAdornment, Button, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import PhotoCamera from "@mui/icons-material/PhotoCamera";

import { useFormik } from "formik";
import * as yup from "yup";
// import { handleNext } from "../../../../Store/Slices";

import "./style.css";

const Input = styled("input")({
  display: "none",
});

const validationSchema = yup.object({
  image: yup.string("ادخل شعار الجيم").required("الشعار مطلوب"),
  name: yup
    .string("ادخل اسم الجيم")
    .min(8, "ادخل اسم صحيح طوله 8 على الاقل")
    .required("الاسم مطلوب"),
  email: yup
    .string("ادخل الايميل")
    .email("ادخل ايميل صحيح")
    .required("الايميل مطلوب"),
  password: yup
    .string("ادخل كلمة المرور")
    .min(8, "كلمة المرور على الاقل 8 احرف")
    .required("كلمة المرور مطلوبة"),
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

export default function StepOneComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values.image);
      const fileReader = await convertToBase64(values.image);
      console.log(fileReader);
    },
  });

  // const dispatch = useDispatch();
  return (
    <form className="first-form" onSubmit={formik.handleSubmit}>
      <TextField
        sx={{ mt: 1 }}
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
        value={formik.values.name}
        onChange={formik.handleChange}
        error={!!formik.errors.name}
        helperText={formik.errors.name}
        variant="outlined"
      />
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          name="image"
          // value={formik.values.image}
          onChange={(event) => {
            formik.setFieldValue("image", event.currentTarget.files[0]);
            console.log(event.currentTarget);
          }}
        />
        {/* <input id="file" name="file" type="file" onChange={(event) => {
  setFieldValue("file", event.currentTarget.files[0]);
}} /> */}
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          position="end"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <TextField
        sx={{ mt: 1 }}
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
        value={formik.values.email}
        onChange={formik.handleChange}
        error={!!formik.errors.email}
        helperText={formik.errors.email}
        variant="outlined"
      />
      <TextField
        sx={{ mt: 1 }}
        id="outlined-basic"
        label="أدخل كلمة السر"
        type={showPassword ? "text" : "password"}
        name="password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </InputAdornment>
          ),
        }}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={!!formik.errors.password}
        helperText={formik.errors.password}
        variant="outlined"
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 1, height: "3.3rem" }}
        onClick={() => {
          console.log("gyms");
          // dispatch(handleNext());
        }}
      >
        الخطوة التالية
      </Button>
    </form>
  );
}
