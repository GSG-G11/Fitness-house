import React from "react";
import FilterSide from "../Components/FilterSide";

const gymData = {
  cities: ["غزة", "خانيونس", "رفح"],
  genders: ["ذكور", "إناث", "ذكور وإناث"],
  gymsFeatures: ["ميدان تنافسي", "ملعب رياضي", "مسبح", "مدرب شخصي"],
};
export default function SearchGym() {
  return (
    <div className="container">
      <FilterSide gymData={gymData} />
    </div>
  );
}
