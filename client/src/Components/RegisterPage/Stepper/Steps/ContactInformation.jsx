/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useDispatch } from "react-redux";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import PropTypes from "prop-types";
import { handleBack } from "../../../../Store/Slices";

import "./style.css";

import * as Cities from "../../../../Services/Cities.json";

const { cities } = Cities;

export default function ContactInformation({ contactForm }) {
  const dispatch = useDispatch();

  return (
    <form onSubmit={contactForm.handleSubmit} className="form__container">
      <TextField
        sx={{ width: "350px", marginBottom: "1rem", marginTop: "1rem" }}
        id="gym-name-required"
        label="رقم الهاتف"
        type="text"
        name="phone"
        error={!!contactForm.errors.phone}
        helperText={contactForm.errors.phone}
        onChange={contactForm.handleChange}
        value={contactForm.values.phone}
      />

      <Autocomplete
        sx={{ width: "350px", marginBottom: "1rem", marginTop: "1rem" }}
        defaultValue="غزة"
        disableClearable
        disablePortal
        name="city"
        value={contactForm.values.city}
        options={(cities || []).map(({ city }) => city)}
        renderInput={(params) => (
          <TextField
            label="المدينة"
            error={!!contactForm.errors.city}
            helperText={contactForm.errors.city}
            {...params}
          />
        )}
      />

      <TextField
        sx={{ width: "350px", marginBottom: "1rem", marginTop: "1rem" }}
        id="standard-multiline-flexible"
        label="الوصف"
        multiline
        maxRows={5}
        minRows={4}
        name="description"
        onChange={contactForm.handleChange}
        value={contactForm.values.description}
        error={!!contactForm.errors.description}
        helperText={contactForm.errors.description}
        variant="outlined"
      />

      <Box
        sx={{
          width: "350px",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            width: "165px",
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
            width: "165px",
            height: "56px",
          }}
          size="large"
          type="submit"
          variant="contained"
        >
          أكمل التسجيل
        </Button>
      </Box>
    </form>
  );
}

ContactInformation.propTypes = {
  contactForm: PropTypes.instanceOf(Object).isRequired,
};
