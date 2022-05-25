import React, { useState } from "react";
import PropTypes from "prop-types";

import {
  TableCell,
  TableRow,
  FormControlLabel,
  styled,
  Switch,
  FormGroup,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";

const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&:before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&:after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function EnhancedTableRow({ row }) {
  const [status, setStatus] = useState(row.status);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = async () => {
    try {
      setStatus(!status);
      await axios({
        method: "PUT",
        url: `/api/v1/subscriptions/${row.id}`,
      });
      if (!status) {
        enqueueSnackbar("تم تفعيل الاشتراك بنجاح", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } else {
        enqueueSnackbar("تم الغاء تفعيل الاشتراك بنجاح", {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      }
    } catch (error) {
      enqueueSnackbar("عذرا حدث خطأ ما", {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
      });
    }
  };

  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row.userPhone}>
      <TableCell align="left">{row.username}</TableCell>
      <TableCell align="left">{row.userPhone}</TableCell>
      <TableCell align="left">
        {row.type === "month" ? "شهر" : "6 شهور"}
      </TableCell>
      <TableCell align="left">{row.createdAt.split("T")[0]}</TableCell>
      <TableCell align="left">
        <FormGroup>
          <FormControlLabel
            control={
              <Android12Switch
                name="status"
                checked={status}
                onChange={handleChange}
              />
            }
            label={status ? "مشترك" : "غير مشترك"}
          />
        </FormGroup>
      </TableCell>
    </TableRow>
  );
}
EnhancedTableRow.propTypes = {
  row: PropTypes.instanceOf(Object).isRequired,
};
