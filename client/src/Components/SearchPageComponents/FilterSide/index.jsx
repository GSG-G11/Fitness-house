import PropTypes from "prop-types";
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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./style.css";
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

function FilterSide({ changeFilterQuery }) {
  const { cities, gymsFeatures, genders } = gymData;
  const [checked, setChecked] = useState(true);
  const [features, setfeatures] = useState([]);
  const [price, setPrice] = useState([30, 150]);
  const [rating, setRating] = useState(0);
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
  const handleClearState = () => {
    setfeatures([]);
    setPrice([30, 150]);
    setRating(0);
    setGymName("");
    setCity("");
    setGender("");
    setChecked(true);
  };

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };
  useEffect(() => {
    changeFilterQuery(
      `name=${gymName}&city=${city}&typeGender=${gender}&minPrice=${
        price[0]
      }&maxPrice=${price[1]}&availability=${checked}&features=${features.join(
        ","
      )}&review=${rating}`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, checked, rating, gender, features, gymName, city]);

  return (
    <div className="rightfilter">
      <div className="filter-head">
        <h1 className="filter-title">البحث</h1>
        <InputLabel onClick={handleClearState} className="lead">
          مسح البحث
        </InputLabel>
      </div>
      <Divider variant="middle" />
      <div className="filter-body">
        <div className="filter-item">
          <p color="error" className="filter-item-title">
            اسم النادي
          </p>
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
          <p className="filter-item-title">المزايا</p>
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
          <p className="filter-item-title">المدن</p>
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
          <p className="filter-item-title">الفئة</p>
          <FormControl sx={{ width: "100%" }} size="small">
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
        </div>
        <div className="filter-item">
          <p className="filter-item-title">مواعيد الدوام</p>
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
          <p className="filter-item-title">التقييم</p>
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
          <p className="filter-item-title">السعر</p>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={price}
            onChange={handlePriceChange}
            max={200}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
    </div>
  );
}

export default FilterSide;
FilterSide.propTypes = {
  changeFilterQuery: PropTypes.instanceOf(Object).isRequired,
};
