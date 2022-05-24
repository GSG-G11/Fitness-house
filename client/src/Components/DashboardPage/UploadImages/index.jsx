import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Button, FormHelperText, styled, Grid, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { PhotoCamera } from "@mui/icons-material";
import { useSelector } from "react-redux";
import convertToBase64 from "../../../utils";
import "./style.css";
import { useGetGymDataQuery } from "../../../Store/Services/gyms";
import LoadingForm from "./LoadingForm";

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
  const [isPending, setIsPending] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useSelector(({ checkAuth }) => checkAuth.auth);

  const { data, isLoading, isError, isSuccess, refetch } =
    useGetGymDataQuery(id);

  const gymImages = { images: [] };

  const ImageGymForm = useFormik({
    initialValues: { images: [] },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsPending(true);
        await axios({
          method: "POST",
          url: "/api/v1/gym/images",
          data: values,
        });

        setIsPending(false);
        resetForm();
        refetch();
        enqueueSnackbar("تم إضافة الصور بنجاح", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } catch (error) {
        setIsPending(false);
        resetForm();
        enqueueSnackbar("عذرا حدث خطأ ما", {
          variant: "error",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
      ImageGymForm.setFieldValue("images", []);
    },
  });

  const handleDeleteImage = async (imageId) => {
    try {
      await axios({
        method: "DELETE",
        url: `/api/v1/gym/images/${imageId}`,
      });

      enqueueSnackbar("تم حذف الصورة بنجاح", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
      refetch();
    } catch (error) {
      enqueueSnackbar("عذرا, حدث خطا ما, اعد المحاولة", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  const handleCancelImage = (imageId) => {
    ImageGymForm.setFieldValue(
      "images",
      ImageGymForm.values.images.filter((_, index) => index !== imageId)
    );
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  if (!isError && isSuccess) {
    const {
      gymData: { images },
    } = data;
    gymImages.images = images;
  }

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {gymImages &&
          gymImages.images.map(({ id: imageId, pathUrl }) => (
            <Grid key={imageId} item xs={12} md={3} sx={{ mt: 1 }}>
              <div className="card__image-gym">
                <img
                  src={pathUrl}
                  className="preview_gym_images"
                  alt="imageProfile"
                />
                <button
                  className="btn-delete"
                  type="button"
                  onClick={() => handleDeleteImage(imageId)}
                >
                  <DeleteOutlineIcon />
                </button>
              </div>
            </Grid>
          ))}
      </Grid>
      <form className="form__upload_image" onSubmit={ImageGymForm.handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} md={4}>
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
                  mt: 1,
                  height: "2.6rem",
                  display: "block",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "start",
                  }}
                >
                  <PhotoCamera sx={{ mr: 1 }} />
                  ادخل صور
                </Box>
              </Button>
              <FormHelperText id="component-error-text" error>
                {ImageGymForm.errors.images}
              </FormHelperText>
            </label>
          </Grid>
          <Grid item xs={12} md={4}>
            <LoadingButton
              style={isPending ? { color: "#00000080" } : { color: "#fff" }}
              sx={{
                mt: 1,
                height: "2.6rem",
                width: "280px",
                fontSize: "1rem",
                "& .MuiLoadingButton-loadingIndicator": {
                  color: "#00000080",
                },
              }}
              type="submit"
              variant="contained"
              loading={isPending}
              endIcon={<SendIcon className="rotate__180" />}
              loadingPosition="end"
            >
              {!isPending ? "حفظ الصور" : "جاري حفظ الصور"}
            </LoadingButton>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {ImageGymForm.values.images &&
            ImageGymForm.values.images.map((image, index) => (
              <Grid key={image} item xs={12} md={3} sx={{ mt: 1 }}>
                <div className="card__image-gym">
                  <img
                    src={image}
                    className="preview_gym_images"
                    alt="imageProfile"
                  />
                  <button
                    className="btn-delete"
                    type="button"
                    onClick={() => handleCancelImage(index)}
                  >
                    <DeleteOutlineIcon />
                  </button>
                </div>
              </Grid>
            ))}
        </Grid>
      </form>
    </>
  );
}
