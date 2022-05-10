import React from "react";
import { useParams } from "react-router-dom";
import GymImages from "../Components/GymImages";

import GymReviews from "../Components/Reviews";

import GymProfile from "../Components/GymProfile";

import { useGetGymDataQuery } from "../Store/Services/TopGyms";

export default function ProfileGym() {
  const { gymId } = useParams();
  const { data, isLoading, isError, isSuccess } = useGetGymDataQuery(gymId);
  const renderProfile = () => {
    if (isLoading) {
      return <div> تحميل</div>;
    }
    if (isError) {
      return <div>عذرا هناك خطأ , أعد تحديث الصفحة </div>;
    }

    const { gymData } = data;
    if (isSuccess && gymData.length === 0)
      return <div>النادي غير موجود , أعد تحديث الصفحة </div>;
    return (
      <>
        <GymProfile gymData={gymData} />
        <div className="container bg__container imgfooter">
          <GymImages gymData={gymData} />
        </div>
        <GymReviews gymData={gymData} />
      </>
    );
  };

  return (
    // <div className="container">
    <>{renderProfile()}</>
    // </div>
  );
}
