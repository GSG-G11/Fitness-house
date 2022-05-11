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
import React from "react";
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
const initilstate = {
  name: "",
  features: [],
  city: "",
  gender: "",
  fulltime: false,
  rating: 5,
  price: [0, 150],
};

function FilterSide({ gymData }) {
  const { cities, gymsFeatures, genders } = gymData;
  const [inputfilter, setInputfilter] = React.useState(initilstate);

  const handleInputChange = (event, inputName, newValue = "") => {
    const { value, checked } = event.target;
    if (inputName === "fulltime") {
      setInputfilter({ ...inputfilter, [inputName]: checked });
      return;
    }
    if (newValue) {
      setInputfilter({ ...inputfilter, [inputName]: newValue });
      return;
    }
    setInputfilter({ ...inputfilter, [inputName]: value });
  };

  const { name, features, city, gender, fulltime, rating, price } = inputfilter;
  return (
    <div className="rightfilter">
      <div className="filter-head">
        <h1 className="filter-title">البحث</h1>
        <p className="lead">مسح البحث</p>
      </div>
      <Divider variant="middle" />
      <div className="filter-body">
        <div className="filter-item">
          <h3 className="filter-item-title">اسم النادي</h3>
          <TextField
            sx={{ width: "100%" }}
            size="small"
            id="outlined-basic"
            label="ابحث باسم النادي"
            variant="outlined"
            value={name}
            onChange={(event) => handleInputChange(event, "name")}
          />
        </div>
        <div className="filter-item">
          <h3 className="filter-item-title">المزايا</h3>
          <FormGroup>
            <Autocomplete
              multiple
              id="tags-outlined"
              value={features}
              options={gymsFeatures}
              // getOptionLabel={({ title }) => title}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  label="أضف المزايا"
                  placeholder="أضف مزايا أخرى"
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                />
              )}
              onChange={(event, newValue) => {
                handleInputChange(event, "features", newValue);
              }}
            />
          </FormGroup>
        </div>
        {/* this is city section */}
        <div className="filter-item">
          <h3 className="filter-item-title">المدن</h3>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel>المدينة</InputLabel>
            <Select
              value={city}
              onChange={(event) => handleInputChange(event, "city")}
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
          <h3 className="filter-item-title">الفئة</h3>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel>الفئة</InputLabel>
            <Select
              value={gender}
              onChange={(event) => handleInputChange(event, "gender")}
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
          <h3 className="filter-item-title">مواعيد الدوام</h3>
          <div className="switchdiv">
            <h1 className="switch-title">مغلق في الاجازات</h1>
            <Switch
              checked={fulltime}
              onChange={(event) => handleInputChange(event, "fulltime")}
              inputProps={{ "aria-label": "controlled" }}
            />
            <h1 className="switch-title">طوال الأسبوع</h1>
          </div>
        </div>
        <div className="filter-item">
          <h3 className="filter-item-title">التقييم</h3>
          <div className="rating">
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                handleInputChange(event, "rating", newValue);
              }}
            />
          </div>
        </div>
        <div className="filter-item">
          <h3 className="filter-item-title">السعر</h3>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={price}
            onChange={(event) => handleInputChange(event, "price")}
            max={500}
            valueLabelDisplay="auto"
          />
        </div>
      </div>
    </div>
  );
}
FilterSide.propTypes = {
  gymData: PropTypes.instanceOf(Object).isRequired,
};

export default FilterSide;
