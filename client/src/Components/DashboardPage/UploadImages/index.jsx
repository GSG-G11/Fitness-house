import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Button, FormHelperText, styled, Grid, Badge } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
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
    initialValues: gymImages,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        setIsPending(true);
        const { status } = await axios({
          method: "POST",
          url: "/api/v1/gym/images",
          data: values,
        });

        if (status !== 200) throw new Error("حدث خطأ ما");
        setIsPending(false);
        refetch();
        enqueueSnackbar("تم إضافة الصور بنجاح", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      } catch (error) {
        setIsPending(false);
        enqueueSnackbar("عذرا حدث خطأ ما", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
    },
  });

  if (isLoading) {
    return <LoadingForm />;
  }

  if (!isError && isSuccess) {
    const {
      gymData: { images },
    } = data;
    const oldimages = images.map((image) => image.pathUrl);
    gymImages.images = oldimages;
  }

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
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {ImageGymForm.values.images &&
          ImageGymForm.values.images.map((image) => (
            <Grid key={image} item xs={12} md={4} sx={{ mt: 1 }}>
              <Badge
                badgeContent={<CloseIcon sx={{ height: 15, width: 15 }} />}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                color="error"
                // overlap="circular"
              >
                <img src={image} className="preview_img" alt="imageProfile" />
              </Badge>
            </Grid>
          ))}
      </Grid>
      <LoadingButton
        style={isPending ? { color: "#00000080" } : { color: "#fff" }}
        sx={{
          mt: 2,
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
    </form>
  );
}
