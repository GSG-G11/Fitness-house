import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Switch,
  Rating,
  Slider,
  Autocomplete,
  FormGroup,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import PropTypes from "prop-types";

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
const gymData = {
  cities: ["غزة", "خانيونس", "رفح"],
  genders: ["ذكور", "إناث", "ذكور وإناث"],
  gymsFeatures: ["ميدان تنافسي", "ملعب رياضي", "مسبح", "مدرب شخصي"],
};
function FilterSide() {
  const { cities, gymsFeatures, genders } = gymData;
  const [checked, setChecked] = useState(false);
  const [features, setfeatures] = useState([]);
  const [price, setPrice] = useState([20, 40]);
  const [rating, setRating] = useState(3.5);
  const [gymName, setGymName] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const handleGymNameChange = (e) => {
    setGymName(e.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <div className="rightfilter">
      <div className="filter-head">
        <h1 className="filter-title">البحث</h1>
        <p className="lead">مسح البحث</p>
      </div>
      <Divider variant="middle" />
      <div className="filter-body">
        <div className="filter-item">
          <lable className="filter-item-title">اسم النادي</lable>
          <TextField
            sx={{ width: "100%" }}
            size="small"
            id="outlined-basic"
            label="ابحث باسم النادي"
            variant="outlined"
            value={gymName}
            onChange={handleGymNameChange}
          />
        </div>
        <div className="filter-item">
          <lable className="filter-item-title">المزايا</lable>
          <FormGroup>
            <Autocomplete
              multiple
              id="tags-outlined"
              value={features}
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
        </div>
        {/* this is city section */}
        <div className="filter-item">
          <lable className="filter-item-title">المدن</lable>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel>المدينة</InputLabel>
            <Select
              value={city}
              onChange={handleCityChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {cities.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* this is Gender section */}
        <div className="filter-item">
          <lable className="filter-item-title">الفئة</lable>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel>الفئة</InputLabel>
            <Select
              value={gender}
              onChange={handleGenderChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {genders.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="filter-item">
          <lable className="filter-item-title">مواعيد الدوام</lable>
          <div className="switchdiv">
            <h1 className="switch-title">مغلق في الاجازات</h1>
            <Switch
              checked={checked}
              onChange={handleSwitchChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <h1 className="switch-title">طوال الأسبوع</h1>
          </div>
        </div>
        <div className="filter-item">
          <lable className="filter-item-title">التقييم</lable>
          <div className="rating">
            <Rating
              name="simple-controlled"
              value={rating}
              precision={0.5}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </div>
        </div>
        <div className="filter-item">
          <lable className="filter-item-title">السعر</lable>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={price}
            onChange={handlePriceChange}
            max={200}
            valueLabelDisplay="auto"
          />
        </div>
        <div className="filter-item searchbtn">
          <div className="switchdiv">
            <Button variant="contained">اعرض النتائج</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
FilterSide.propTypes = {
  gymData: PropTypes.instanceOf(Object).isRequired,
};

export default FilterSide;
