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
import gymData from "./gymdata";

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

export default function StepThreeComponent({ thirfForm }) {
  const { gymsFeatures, genders } = gymData;
  const dispatch = useDispatch();
  return (
    <form className="form__container" onSubmit={thirfForm.handleSubmit}>
      <FormGroup>
        <Autocomplete
          sx={{ width: "500px", marginBottom: "1rem", marginTop: "1rem" }}
          multiple
          name="features"
          value={thirfForm.values.features}
          onChange={(event, newValue) => {
            thirfForm.setFieldValue("features", newValue);
          }}
          options={gymsFeatures}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              label="المزايا"
              error={!!thirfForm.errors.features}
              helperText={thirfForm.errors.features}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
            />
          )}
        />
      </FormGroup>
      <FormControl sx={{ width: "500px", marginBottom: "1rem" }}>
        <InputLabel>الفئة</InputLabel>
        <Select
          name="gender"
          value={thirfForm.values.gender}
          onChange={thirfForm.handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          error={!!thirfForm.errors.gender}
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
          name="monthPrice"
          variant="outlined"
          onChange={thirfForm.handleChange}
          value={thirfForm.values.monthPrice}
          error={!!thirfForm.errors.monthPrice}
          helperText={thirfForm.errors.monthPrice}
          required
        />
        <TextField
          sx={{ width: "240px", marginBottom: "1rem", marginTop: "1rem" }}
          id="gym-name-required"
          label="اشتراك ستة أشهر"
          type="text"
          name="sixMonthPrice"
          variant="outlined"
          onChange={thirfForm.handleChange}
          value={thirfForm.values.sixMonthPrice}
          error={!!thirfForm.errors.sixMonthPrice}
          helperText={thirfForm.errors.sixMonthPrice}
          required
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
            name="checked"
            checked={thirfForm.values.checked}
            onChange={thirfForm.handleChange}
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
  thirfForm: PropTypes.instanceOf(Object).isRequired,
};
