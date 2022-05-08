import React from "react";
import "./style.css";

function Join() {
  return (
    <div className="bg__container container">
      <div className="sub__container">
        <div className="row">
          <div className="join">
            <h1>كيف يمكنك الإنضمام لناديك المفضل ؟</h1>
            <p>
              هذه هي الخطوات التي يمكنك من خلالها الإنضمام لأي نادي موجود على فت
              هاوس.
            </p>
          </div>
          <div className="join-steps">
            <div className="join-steps-item">
              <div className="join-steps-item-img">
                <img
                  className="join-steps-item-img-2"
                  src="https://cdn-icons-png.flaticon.com/512/179/179349.png"
                  alt="step one"
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
                  alt="step two"
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
                  alt="step three"
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
                  alt="step four"
                />
                <h2>احجز موعد</h2>
                <p className="join-steps-item-p">
                  قم بحجز اشتراكك عن طريق فت هاوس في اي نادي من اختيارك{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
