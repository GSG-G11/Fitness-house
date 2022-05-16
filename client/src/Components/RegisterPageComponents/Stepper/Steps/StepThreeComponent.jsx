import React, { useState } from "react";
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
import { handleBack, handleNext } from "../../../../Store/Slices";
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

export default function StepThreeComponent() {
  const { gymsFeatures, genders } = gymData;
  const [gender, setGender] = useState("");
  const [monthPrice, setMonthPrice] = useState(0);
  const [sixMonthPrice, setSixMonthPrice] = useState(0);

  const [checked, setChecked] = useState(true);
  const [myfeatures, setfeatures] = useState([]);
  const dispatch = useDispatch();
  const handleMonthPrice = (e) => {
    setMonthPrice(e.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };
  const handleSixMonthPrice = (e) => {
    setSixMonthPrice(e.target.value);
  };
  return (
    <form className="form__container">
      <FormGroup>
        <Autocomplete
          sx={{ width: "500px", marginBottom: "1rem", marginTop: "1rem" }}
          multiple
          id="tags-outlined"
          value={myfeatures}
          options={gymsFeatures}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              label="أضف المزايا"
              placeholder="أضف مزايا أخرى"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
            />
          )}
          onChange={(event, newValue) => {
            setfeatures(newValue);
          }}
        />
      </FormGroup>
      <FormControl sx={{ width: "500px", marginBottom: "1rem" }}>
        <InputLabel>الفئة</InputLabel>
        <Select
          value={gender}
          onChange={handleGenderChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
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
          onChange={handleMonthPrice}
          value={monthPrice}
          required
        />
        <TextField
          sx={{ width: "240px", marginBottom: "1rem", marginTop: "1rem" }}
          id="gym-name-required"
          label="اشتراك ستة أشهر"
          type="text"
          name="sixMonthPrice"
          variant="outlined"
          onChange={handleSixMonthPrice}
          value={sixMonthPrice}
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
            checked={checked}
            onChange={handleSwitchChange}
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
          onClick={() => dispatch(handleNext())}
        >
          إنهاء التسجيل
        </Button>
      </Box>
    </form>
  );
}
