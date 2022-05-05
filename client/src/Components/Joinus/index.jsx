import React from "react";
import "./style.css";

function Join() {
  return (
    <div className="cont">
      <div className="join">
        <h1>كيف يمكنك الإنضمام لناديك المفضل ؟</h1>
        <p>
          هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا
          النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من
          النصوص الأخرى إضافة إلى زيادة عدد الحروف .
        </p>
      </div>
      <div className="join-steps">
        <div className="join-steps-item">
          <div className="join-steps-item-img">
            <img
              className="join-steps-item-img-2"
              src="https://cdn-icons-png.flaticon.com/512/179/179349.png"
              alt=""
            />
            <h2>تصفح الأندية</h2>
            <p className="join-steps-item-p">
              تصفح قائمة الأندية المتوفرة على الموقع{" "}
            </p>
          </div>
        </div>
        <div className="join-steps-item">
          <div className="join-steps-item-img">
            <img
              className="join-steps-item-img-2"
              src="https://cdn-icons-png.flaticon.com/512/179/179350.png"
              alt=""
            />
            <h2>اختر نادي</h2>
            <p className="join-steps-item-p">
              اختر النادي المناسب لتطلعاتك بناء على اختياراتك{" "}
            </p>
          </div>
        </div>
        <div className="join-steps-item">
          <div className="join-steps-item-img">
            <img
              className="join-steps-item-img-2"
              src="https://cdn-icons-png.flaticon.com/512/179/179351.png"
              alt=""
            />
            <h2>أنشئ حساب</h2>
            <p className="join-steps-item-p">
              قم بإنشاء حساب للتمتع بكافة مزايا فت هاوس{" "}
            </p>
          </div>
        </div>
        <div className="join-steps-item">
          <div className="join-steps-item-img">
            <img
              className="join-steps-item-img-2"
              src="https://cdn-icons-png.flaticon.com/512/179/179352.png"
              alt=""
            />
            <h2>احجز موعد</h2>
            <p className="join-steps-item-p">
              قم بحجز اشتراكك عن طريق فت هاوس في اي نادي من اختيارك{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
