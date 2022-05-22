import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { useFormik } from "formik";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";

import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const subscriptionSchema = Yup.object().shape({
  username: Yup.string().required("حقل اسم المستخدم مطلوب"),
  phone: Yup.string()
    .length(10, "رقم الهاتف غير صحيح")
    .required("حقل رقم الهاتف مطلوب"),
  subscription: Yup.string().required("حقل الاشتراك مطلوب"),
});
function Modal() {
  const [open, setOpen] = useState(false);
  const modalForm = useFormik({
    initialValues: {
      username: "",
      phone: "",
      subscription: "",
    },
    validationSchema: subscriptionSchema,
    onSubmit: () => {
      console.log(modalForm.values);
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen} variant="contained">
        احجز موعد
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={modalForm.handleSubmit} className="form__container">
          <DialogTitle sx={{ fontWeight: "bold" }} color="primary">
            اشترك الآن
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              أختار الباقة التي تناسبك من باقات النادي، ومن ثم اضغط على زر احجز
              موعد
            </DialogContentText>
            <TextField
              sx={{ width: "100%", marginTop: "1rem" }}
              size="medium"
              name="username"
              id="username"
              value={modalForm.values.username}
              error={!!modalForm.errors.username}
              helperText={modalForm.errors.username}
              onChange={modalForm.handleChange}
              label="أدخل اسم المستخدم"
              variant="outlined"
            />
            <TextField
              sx={{ width: "100%", marginTop: "1rem" }}
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              size="medium"
              name="phone"
              id="phone"
              value={modalForm.values.phone}
              error={!!modalForm.errors.phone}
              helperText={modalForm.errors.phone}
              onChange={modalForm.handleChange}
              label="أدخل رقم الهاتف"
              variant="outlined"
            />
            <FormControl
              sx={{ width: "100%", marginTop: "1rem" }}
              size="medium"
              label="أدخل اسم المستخدم"
              variant="outlined"
            >
              <InputLabel size="medium">مدة الاشتراك</InputLabel>
              <Select
                id="subscription"
                name="subscription"
                value={modalForm.values.subscription}
                onChange={modalForm.handleChange}
                input={<OutlinedInput label="Name" />}
              >
                <MenuItem value="month">اشتراك شهري</MenuItem>
                <MenuItem value="sixMonth">اشتراك ست أشهر</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button
              xs={{ fontWeight: "bold" }}
              onClick={handleClose}
              type="submit"
            >
              أتمم الحجز
            </Button>
            <Button xs={{ fontWeight: "bold" }} onClick={handleClose}>
              إلغاء الحجز
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default Modal;
