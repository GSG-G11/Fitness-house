import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Autocomplete,
  Button,
  FormControl,
  FormGroup,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  TextField,
  OutlinedInput,
  MenuItem,
  Switch,
  styled,
  FormHelperText,
  Typography,
  Box,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SendIcon from "@mui/icons-material/Send";

import { PhotoCamera } from "@mui/icons-material";

import { useSelector } from "react-redux";
import { cities, genders, features as allFeature } from "../../../Services";

import convertToBase64 from "../../../utils";

import "./style.css";
import { useGetGymDataQuery } from "../../../Store/Services/gyms";
import LoadingForm from "./LoadingForm";

const validationSchema = Yup.object().shape({
  logo: Yup.string().required("حقل الصورة مطلوب"),
  gymName: Yup.string().required("حقل الاسم مطلوب"),
  city: Yup.string().required("حقل المدينة مطلوب"),
  phone: Yup.string()
    .length(10, "رقم الهاتف غير صحيح")
    .required("حقل رقم الهاتف مطلوب"),
  features: Yup.array().min(1, "حقل المزايا مطلوب"),
  typeGender: Yup.string().required("حقل الفئة مطلوب"),
  monthlyPrice: Yup.number()
    .moreThan(1, "يرجى إدخال قيمة أعلى من 1")
    .required("قيمة اشتراك الشهر مطلوب"),
  sixMonthPrice: Yup.number()
    .moreThan(1, "يرجى إدخال قيمة أعلى من 1")
    .required("قيمة اشتراك الستة أشهر مطلوب"),
});

const ITEM_HEIGHT = 25;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Input = styled("input")({
  display: "none",
});

export default function UpdateProfile() {
  const [isPending, setIsPending] = useState(false);
  const { id } = useSelector(({ checkAuth }) => checkAuth.auth);

  const { data, isLoading, isError, isSuccess } = useGetGymDataQuery(id);

  const profileGyms = {
    logo: "",
    gymName: "",
    city: "غزة",
    phone: "",
    features: [],
    monthlyPrice: "",
    sixMonthPrice: "",
    description: "",
    typeGender: "",
    fulltime: false,
  };

  const updateGymForm = useFormik({
    initialValues: profileGyms,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setIsPending(true);
      // send request for Api
      console.log(values);
    },
  });

  if (isLoading) {
    return <LoadingForm />;
  }

  if (!isError && isSuccess) {
    const {
      gymData: {
        gymName,
        logo,
        city,
        phone,
        features,
        monthlyPrice,
        sixMonthPrice,
        description,
        typeGender,
        fulltime,
      },
    } = data;
    profileGyms.gymName = gymName;
    profileGyms.logo = logo;
    profileGyms.city = city;
    profileGyms.phone = phone;
    profileGyms.features = features;
    profileGyms.monthlyPrice = monthlyPrice;
    profileGyms.sixMonthPrice = sixMonthPrice;
    profileGyms.description = description;
    profileGyms.typeGender = typeGender;
    profileGyms.fulltime = fulltime;
  }

  return (
    <form
      className="form__update_profile"
      onSubmit={updateGymForm.handleSubmit}
    >
      <Grid container spacing={2}>
        {/* Input Name Gym */}
        <Grid item xs={12} md={4}>
          <TextField
            sx={{ mt: 1, width: "100%" }}
            id="outlined-basic"
            label="اسم النادي"
            name="gymName"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            value={updateGymForm.values.gymName}
            onChange={updateGymForm.handleChange}
            error={!!updateGymForm.errors.gymName}
            helperText={updateGymForm.errors.gymName}
            variant="outlined"
          />
        </Grid>

        {/* Input phone Gym */}
        <Grid item xs={12} md={4}>
          <TextField
            sx={{ mt: 1, width: "100%" }}
            label="رقم الهاتف"
            type="text"
            name="phone"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            error={!!updateGymForm.errors.phone}
            helperText={updateGymForm.errors.phone}
            onChange={updateGymForm.handleChange}
            value={updateGymForm.values.phone}
          />
        </Grid>

        {/* Input fulltime */}
        <Grid item xs={12} md={4}>
          <FormControl
            sx={{
              mt: 1,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #bebebe",
              height: "3.5rem",
              borderRadius: "5px",
            }}
          >
            <div className="switchdiv">
              <Typography variant="body1">مغلق في الاجازات</Typography>
              <Switch
                name="fulltime"
                checked={updateGymForm.values.fulltime}
                onChange={updateGymForm.handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <Typography variant="body1">طوال الأسبوع</Typography>
            </div>
          </FormControl>
        </Grid>

        {/* Input gender Gym */}
        <Grid item xs={12} md={4}>
          <FormControl sx={{ mt: 1, width: "100%" }}>
            <InputLabel>الفئة</InputLabel>
            <Select
              name="typeGender"
              value={updateGymForm.values.typeGender}
              onChange={updateGymForm.handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              error={!!updateGymForm.errors.typeGender}
            >
              {genders.map(({ name, value }) => (
                <MenuItem key={value} value={value}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Input city Gym */}
        <Grid item xs={12} md={4}>
          <Autocomplete
            sx={{ mt: 1, width: "100%" }}
            disableClearable
            disablePortal
            name="city"
            value={updateGymForm.values.city}
            options={cities.map(({ city }) => city)}
            renderInput={(params) => (
              <TextField
                label="المدينة"
                error={!!updateGymForm.errors.city}
                helperText={updateGymForm.errors.city}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
              />
            )}
          />
        </Grid>

        {/* Input Price Gym */}
        <Grid item container xs={12} md={4}>
          <FormControl
            sx={{
              mt: 1,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <TextField
              sx={{ width: "100%" }}
              label="الاشتراك الشهري"
              type="text"
              name="monthlyPrice"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
              onChange={updateGymForm.handleChange}
              value={updateGymForm.values.monthlyPrice}
              error={!!updateGymForm.errors.monthlyPrice}
              helperText={updateGymForm.errors.monthlyPrice}
            />
            <TextField
              sx={{ width: "100%" }}
              label="اشتراك ستة أشهر"
              type="text"
              name="sixMonthPrice"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
              onChange={updateGymForm.handleChange}
              value={updateGymForm.values.sixMonthPrice}
              error={!!updateGymForm.errors.sixMonthPrice}
              helperText={updateGymForm.errors.sixMonthPrice}
            />
          </FormControl>
        </Grid>

        {/* Input Description Gym */}
        <Grid item xs={12} md={4}>
          <TextField
            sx={{ width: "100%", mt: 1 }}
            id="standard-multiline-flexible"
            label="الوصف"
            multiline
            maxRows={9}
            minRows={9}
            name="description"
            onChange={updateGymForm.handleChange}
            value={updateGymForm.values.description}
            error={!!updateGymForm.errors.description}
            helperText={updateGymForm.errors.description}
            variant="outlined"
          />
        </Grid>

        {/* Input logo Gym */}
        <Grid item xs={12} md={4}>
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
                updateGymForm.setFieldValue("logo", imageBase);
              }}
            />
            <Button
              variant="outlined"
              component="span"
              sx={{
                mt: 1,
                height: "16.7rem",
                display: "block",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  justifyContent: "center",
                }}
              >
                <PhotoCamera sx={{ mr: 1 }} />
                تعديل الشعار
              </Box>
              <Box>
                {updateGymForm.values.logo && (
                  <img
                    src={updateGymForm.values.logo}
                    className="preview_profile_img"
                    alt="imageProfile"
                  />
                )}
              </Box>
            </Button>
            <FormHelperText id="component-error-text" error>
              {updateGymForm.errors.logo}
            </FormHelperText>
          </label>
        </Grid>

        {/* Input Feature Gym */}
        <Grid item xs={12} md={4}>
          <FormGroup sx={{ mt: 1, width: "100%" }}>
            <Autocomplete
              multiple
              name="features"
              value={updateGymForm.values.features}
              onChange={(event, newValue) => {
                updateGymForm.setFieldValue("features", newValue);
              }}
              options={allFeature.map(({ feature }) => feature)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  label="المزايا"
                  error={!!updateGymForm.errors.features}
                  helperText={updateGymForm.errors.features}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                />
              )}
            />
          </FormGroup>
        </Grid>
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
        {!isPending ? "تعديل البيانات" : "جاري تعديل البيانات"}
      </LoadingButton>
    </form>
  );
}
