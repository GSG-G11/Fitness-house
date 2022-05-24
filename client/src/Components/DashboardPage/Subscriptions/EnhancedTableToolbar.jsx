import { Toolbar, Typography, TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function EnhancedTableToolbar({ setSearch }) {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        المشتركين
      </Typography>
      <TextField
        id="filled-search"
        label="ابحث عن مشترك "
        type="search"
        variant="filled"
        sx={{ width: "100%", height: "40px" }}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Toolbar>
  );
}
EnhancedTableToolbar.propTypes = {
  setSearch: PropTypes.func.isRequired,
};
