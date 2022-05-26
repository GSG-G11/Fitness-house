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
  Snackbar,
  Alert,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useGetGymDataQuery } from "../../../Store/Services/gyms";

const subscriptionSchema = Yup.object().shape({
  username: Yup.string().required("حقل اسم المستخدم مطلوب"),
  userPhone: Yup.string()
    .length(10, "رقم الهاتف غير صحيح")
    .required("حقل رقم الهاتف مطلوب"),
  type: Yup.string().required("حقل الاشتراك مطلوب"),
});
function Modal() {
  const [open, setOpen] = useState(false);
  const { gymId } = useParams();
  const [message, setMessage] = useState({ type: "", messageText: "" });
  const { data } = useGetGymDataQuery(gymId);
  const { monthlyPrice, sixMonthPrice } = data.gymData;

  const onFinish = async (subscription, resetForm) => {
    try {
      await axios.post("/api/v1/subscriptions", subscription);
      setMessage({
        type: "success",
        messageText: "تم إضافة الإشتراك بنجاح يرجى مراجعة النادي لتأكيد الحجز",
      });
      setOpen(false);
      localStorage.setItem(
        "user",
        JSON.stringify({
          phone: subscription.userPhone,
          username: subscription.username,
        })
      );
      resetForm();
    } catch (error) {
      if (error.response.status === 409) {
        setMessage({
          type: "error",
          messageText: "تم الاشتراك مسبقاً من قبل هذا الهاتف",
        });
      } else {
        const errorMessage = error.response.data.message;
        setMessage({ type: "error", messageText: errorMessage });
      }
    }
  };
  const modalForm = useFormik({
    initialValues: {
      username: "",
      userPhone: "",
      type: "",
    },
    validationSchema: subscriptionSchema,
    onSubmit: (values, { resetForm }) => {
      onFinish({ ...values, gymId }, resetForm);
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const customHandleChange = (e) => {
    const { value } = e.target;

    modalForm.setFieldValue("userPhone", value);
    if (message.type === "error") {
      setMessage({ type: "", messageText: "" });
    }
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
              name="userPhone"
              id="userPhone"
              onChange={customHandleChange}
              value={modalForm.values.userPhone}
              error={!!modalForm.errors.userPhone}
              helperText={modalForm.errors.userPhone}
              // onChange={modalForm.handleChange}
              label="أدخل رقم الهاتف"
              variant="outlined"
            />
            <FormControl
              sx={{ width: "100%", marginTop: "1rem" }}
              size="medium"
              label="أدخل مدة الاشتراك"
              variant="outlined"
            >
              <InputLabel size="medium">مدة الاشتراك</InputLabel>
              <Select
                id="type"
                name="type"
                value={modalForm.values.type}
                onChange={modalForm.handleChange}
                input={<OutlinedInput label="Name" />}
              >
                <MenuItem value="month">
                  اشتراك شهري - {monthlyPrice} ₪
                </MenuItem>
                <MenuItem value="sixMonth">
                  اشتراك ست أشهر - {sixMonthPrice} ₪
                </MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          {message.type === "error" && (
            <FormHelperText
              sx={{ fontSize: "14px", fontWeight: "bold" }}
              id="component-error-text"
              error
            >
              {message.messageText}
            </FormHelperText>
          )}
          <DialogActions sx={{ mb: 2 }}>
            <Button type="submit" variant="contained">
              أتمم الحجز
            </Button>
            <Button onClick={handleClose} variant="outlined">
              إلغاء الحجز
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={message.type === "success"}
        autoHideDuration={6000}
        onClose={() => setMessage({})}
      >
        <Alert
          onClose={() => setMessage({})}
          variant="filled"
          severity="success"
        >
          {message.messageText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Modal;
