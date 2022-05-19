/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  Autocomplete,
  Button,
  FormGroup,
  TextField,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Switch,
} from "@mui/material";
import PropTypes from "prop-types";
import { handleBack } from "../../../../Store/Slices";
import * as gymsFeatures from "../../../../Services/features.json";
import * as userGenders from "../../../../Services/genders.json";

const { features } = gymsFeatures;
const { genders } = userGenders;

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

export default function StepThreeComponent({ detailsForm }) {
  const dispatch = useDispatch();
  return (
    <form className="form__container" onSubmit={detailsForm.handleSubmit}>
      <FormGroup>
        <Autocomplete
          sx={{ width: "500px", marginBottom: "1rem", marginTop: "1rem" }}
          multiple
          name="features"
          value={detailsForm.values.features}
          onChange={(event, newValue) => {
            detailsForm.setFieldValue("features", newValue);
          }}
          options={features.map(({ feature }) => feature)}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              label="المزايا"
              error={!!detailsForm.errors.features}
              helperText={detailsForm.errors.features}
              {...params}
            />
          )}
        />
      </FormGroup>
      <FormControl sx={{ width: "500px", marginBottom: "1rem" }}>
        <InputLabel>الفئة</InputLabel>
        <Select
          name="typeGender"
          value={detailsForm.values.typeGender}
          onChange={detailsForm.handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          error={!!detailsForm.errors.typeGender}
        >
          {genders.map(({ name, value }) => (
            <MenuItem key={value} value={value}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        sx={{
          width: "500px",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextField
          sx={{ width: "240px", marginBottom: "1rem", marginTop: "1rem" }}
          id="gym-name-required"
          label="الاشتراك الشهري"
          type="text"
          name="monthlyPrice"
          variant="outlined"
          onChange={detailsForm.handleChange}
          value={detailsForm.values.monthlyPrice}
          error={!!detailsForm.errors.monthlyPrice}
          helperText={detailsForm.errors.monthlyPrice}
        />
        <TextField
          sx={{ width: "240px", marginBottom: "1rem", marginTop: "1rem" }}
          id="gym-name-required"
          label="اشتراك ستة أشهر"
          type="text"
          name="sixMonthPrice"
          variant="outlined"
          onChange={detailsForm.handleChange}
          value={detailsForm.values.sixMonthPrice}
          error={!!detailsForm.errors.sixMonthPrice}
          helperText={detailsForm.errors.sixMonthPrice}
        />
      </FormControl>
      <FormControl
        sx={{
          width: "500px",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <div className="switchdiv">
          <h3>مغلق في الاجازات</h3>
          <Switch
            name="fulltime"
            checked={detailsForm.values.fulltime}
            onChange={detailsForm.handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <h3>طوال الأسبوع</h3>
        </div>
      </FormControl>
      <Box
        sx={{
          width: "500px",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            width: "240px",
          }}
          size="large"
          variant="contained"
          color="secondary"
          onClick={() => dispatch(handleBack())}
        >
          الرجوع للخلف
        </Button>

        <Button
          sx={{
            width: "240px",
            height: "56px",
          }}
          size="large"
          type="submit"
          variant="contained"
        >
          إنهاء التسجيل
        </Button>
      </Box>
    </form>
  );
}
StepThreeComponent.propTypes = {
  detailsForm: PropTypes.instanceOf(Object).isRequired,
};
