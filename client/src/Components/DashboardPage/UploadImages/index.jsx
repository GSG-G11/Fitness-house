import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button, FormHelperText, styled, Grid } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import convertToBase64 from "../../../utils";

import "./style.css";

const validationSchema = Yup.object().shape({
  images: Yup.array()
    .min(1, "حقل الصور مطلوب")
    .max(5, "لا يمكنك إضافة اكثر من 5 صور")
    .required("حقل الصور مطلوب"),
});

const Input = styled("input")({
  display: "none",
});

export default function UploadImages() {
  const ImageGymForm = useFormik({
    initialValues: { images: [] },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <form className="form__upload_image" onSubmit={ImageGymForm.handleSubmit}>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          type="file"
          id="icon-button-file"
          name="images"
          multiple
          onChange={async (event) => {
            const imageBase = await convertToBase64(
              event.currentTarget.files[0]
            );
            ImageGymForm.setFieldValue("images", [
              ...ImageGymForm.values.images,
              imageBase,
            ]);
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
          ادخل صور
        </Button>
        <FormHelperText id="component-error-text" error>
          {ImageGymForm.errors.images}
        </FormHelperText>
      </label>
      <Grid container spacing={2}>
        {ImageGymForm.values.images &&
          ImageGymForm.values.images.map((image) => (
            <Grid key={image} item xs={12} md={4}>
              <img src={image} className="preview_img" alt="imageProfile" />
            </Grid>
          ))}
      </Grid>
      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 2, height: "2.6rem", width: "225px", fontSize: "1.1rem" }}
      >
        حفظ الصور
      </Button>
    </form>
  );
}
