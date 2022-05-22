import * as Yup from "yup";

const loginInfoSchema = Yup.object().shape({
  logo: Yup.string().required("حقل الشعار مطلوب"),
  gymName: Yup.string().required("حقل الاسم مطلوب"),
  email: Yup.string()
    .email(" البريد الالكتروني غير صحيح")
    .required("حقل البريد الالكتروني مطلوب"),
  password: Yup.string()
    .min(8, "كلمة المرور على الاقل 8 احرف")
    .required("حقل كلمة المرور مطلوب"),
});

const SignupSchema = Yup.object().shape({
  city: Yup.string().required("حقل المدينة مطلوب"),
  phone: Yup.string()
    .length(10, "رقم الهاتف غير صحيح")
    .required("حقل رقم الهاتف مطلوب"),
});
const detailsSchema = Yup.object().shape({
  features: Yup.array().min(1, "حقل المزايا مطلوب"),
  typeGender: Yup.string().required("حقل الفئة مطلوب"),
  monthlyPrice: Yup.number()
    .moreThan(1, "يرجى إدخال قيمة أعلى من 1")
    .required("قيمة اشتراك الشهر مطلوب"),
  sixMonthPrice: Yup.number()
    .moreThan(1, "يرجى إدخال قيمة أعلى من 1")
    .required("قيمة اشتراك الستة أشهر مطلوب"),
});

export { loginInfoSchema, SignupSchema, detailsSchema };
