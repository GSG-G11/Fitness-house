/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
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
} from "@mui/material";
// import { styled } from "@mui/material/styles";

import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import { PhotoCamera } from "@mui/icons-material";
import * as gymsFeatures from "../../../Services/features.json";
import * as userGenders from "../../../Services/genders.json";
import * as Cities from "../../../Services/Cities.json";

import "./style.css";
import convertToBase64 from "../../../utils";

const { features } = gymsFeatures;
const { genders } = userGenders;
const { cities } = Cities;

const validationSchema = Yup.object().shape({
  logo: Yup.string().required("حقل الشعار مطلوب"),
  name: Yup.string().required("حقل الاسم مطلوب"),
  city: Yup.string().required("حقل المدينة مطلوب"),
  phone: Yup.string()
    .length(10, "رقم الهاتف غير صحيح")
    .required("حقل رقم الهاتف مطلوب"),
  features: Yup.array().min(1, "حقل المزايا مطلوب"),
  gender: Yup.string().required("حقل الفئة مطلوب"),
  monthPrice: Yup.number()
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
  const updateGymForm = useFormik({
    initialValues: {
      name: "",
      phone: "",
      monthPrice: 0,
      sixMonthPrice: 0,
      features: [],
      description: "",
      gender: "",
      city: "غزة",
      fulltime: false,
      logo: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // send request for Api
      console.log(values);
    },
  });
  return (
    <form onSubmit={updateGymForm.handleSubmit}>
      <Grid container spacing={2}>
        {/* Input Name Gym */}
        <Grid item xs={12} md={4}>
          <TextField
            sx={{ mt: 1, width: "100%" }}
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
            value={updateGymForm.values.name}
            onChange={updateGymForm.handleChange}
            error={!!updateGymForm.errors.name}
            helperText={updateGymForm.errors.name}
            variant="outlined"
          />
        </Grid>

        {/* Input Price Gym */}
        <Grid item container sx={{ mt: 1, width: "100%" }} xs={12} md={4}>
          <FormControl
            sx={{
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
              name="monthPrice"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AttachMoneyIcon />
                  </InputAdornment>
                ),
              }}
              onChange={updateGymForm.handleChange}
              value={updateGymForm.values.monthPrice}
              error={!!updateGymForm.errors.monthPrice}
              helperText={updateGymForm.errors.monthPrice}
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

        {/* Input gender Gym */}
        <Grid item xs={12} md={4}>
          <FormControl sx={{ mt: 1, width: "100%" }}>
            <InputLabel>الفئة</InputLabel>
            <Select
              name="gender"
              value={updateGymForm.values.gender}
              onChange={updateGymForm.handleChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              error={!!updateGymForm.errors.gender}
            >
              {(genders || []).map(({ gender }) => (
                <MenuItem key={gender} value={gender}>
                  {gender}
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
            options={(cities || []).map(({ city }) => city)}
            renderInput={(params) => (
              <TextField
                label="المدينة"
                error={!!updateGymForm.errors.city}
                helperText={updateGymForm.errors.city}
                {...params}
              />
            )}
          />
        </Grid>

        {/* Input fulltime */}
        <Grid item xs={12} md={4}>
          <FormControl
            sx={{
              mt: 2,
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
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

        {/* Input Description Gym */}
        <Grid item xs={12} md={4}>
          <TextField
            sx={{ width: "100%", mt: 1 }}
            id="standard-multiline-flexible"
            label="الوصف"
            multiline
            maxRows={11}
            minRows={11}
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
                height: "3.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
              }}
            >
              <PhotoCamera sx={{ mr: 1 }} />
              ادخل الشعار
            </Button>
            <FormHelperText id="component-error-text" error>
              {updateGymForm.errors.logo}
            </FormHelperText>
            {updateGymForm.values.logo && (
              <img
                src={updateGymForm.values.logo}
                className="preview_profile_img"
                alt="imageProfile"
              />
            )}
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
              options={(features || []).map(({ feature }) => feature)}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  label="المزايا"
                  error={!!updateGymForm.errors.features}
                  helperText={updateGymForm.errors.features}
                  {...params}
                />
              )}
            />
          </FormGroup>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        type="submit"
        sx={{ mt: 2, height: "2.5rem", width: "250px" }}
      >
        تعديل البيانات
      </Button>
    </form>
  );
}
