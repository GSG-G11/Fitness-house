import React, { useState } from "react";
import GymCard from "../Card";
import "./style.css";

function GymCards() {
  const [gyms] = useState([
    {
      gymName: "اوكسجن جيم",
      logo: "https://bit.ly/3knj5Mc",
      city: "رفح",
      description:
        "(رجال) الأجهزة الأحدث المساحة الأوسع بإختصار (بيت الرياضة) . أوقات الدوام من 8-2 صباحا (نساء) | ومن 3-10 مساء",
      features: ["مدرب خاص", "أحدث الاجهزة", "مساحة واسعة"],
      image:
        "https://s3-alpha-sig.figma.com/img/53af/1b9b/bc626d550d1f6ef92ace66aaa86e4d8d?Expires=1652659200&Signature=B2GY84INR0o3S6cGm7rYlbI81Ziz7rXVqadcx87YM0RluzlWS6ewD49~mkyLee7A4h5QexQ1f9YNx9ZEcVodpWLPjw22JZWj-0eLEs~F~2yp2QA4j7C0zgpKQDfAM-K~IeL18RLIILrzFpIUy1rN2GDvWSnCPOfAg6GtPViIntVSwC0OqEW2ne6~PQIt6RoR-oozSSruaQFPIRK7ZpXea50z5MWxxdyyBidVQVpIo67u5fdmx5Ql76LTJe-9bFT8CLk51ViomdDUle9En~tX5VZceuMEro18EzcP8BCmu~pWncCmm7vO-HyGfgziTDDqcS92UvFMVYJsCA~eAC1B1g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      progress: 75,
    },
    {
      gymName: "اوكسجن جيم",
      logo: "https://bit.ly/3knj5Mc",
      city: "رفح",
      description:
        "(رجال) الأجهزة الأحدث المساحة الأوسع بإختصار (بيت الرياضة) . أوقات الدوام من 8-2 صباحا (نساء) | ومن 3-10 مساء",
      features: ["مدرب خاص", "أحدث الاجهزة", "مساحة واسعة"],
      image:
        "https://s3-alpha-sig.figma.com/img/53af/1b9b/bc626d550d1f6ef92ace66aaa86e4d8d?Expires=1652659200&Signature=B2GY84INR0o3S6cGm7rYlbI81Ziz7rXVqadcx87YM0RluzlWS6ewD49~mkyLee7A4h5QexQ1f9YNx9ZEcVodpWLPjw22JZWj-0eLEs~F~2yp2QA4j7C0zgpKQDfAM-K~IeL18RLIILrzFpIUy1rN2GDvWSnCPOfAg6GtPViIntVSwC0OqEW2ne6~PQIt6RoR-oozSSruaQFPIRK7ZpXea50z5MWxxdyyBidVQVpIo67u5fdmx5Ql76LTJe-9bFT8CLk51ViomdDUle9En~tX5VZceuMEro18EzcP8BCmu~pWncCmm7vO-HyGfgziTDDqcS92UvFMVYJsCA~eAC1B1g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      progress: 80,
    },
    {
      gymName: "اوكسجن جيم",
      logo: "https://bit.ly/3knj5Mc",
      city: "رفح",
      description:
        "(رجال) الأجهزة الأحدث المساحة الأوسع بإختصار (بيت الرياضة) . أوقات الدوام من 8-2 صباحا (نساء) | ومن 3-10 مساء",
      features: ["مدرب خاص", "أحدث الاجهزة", "مساحة واسعة"],
      image:
        "https://s3-alpha-sig.figma.com/img/53af/1b9b/bc626d550d1f6ef92ace66aaa86e4d8d?Expires=1652659200&Signature=B2GY84INR0o3S6cGm7rYlbI81Ziz7rXVqadcx87YM0RluzlWS6ewD49~mkyLee7A4h5QexQ1f9YNx9ZEcVodpWLPjw22JZWj-0eLEs~F~2yp2QA4j7C0zgpKQDfAM-K~IeL18RLIILrzFpIUy1rN2GDvWSnCPOfAg6GtPViIntVSwC0OqEW2ne6~PQIt6RoR-oozSSruaQFPIRK7ZpXea50z5MWxxdyyBidVQVpIo67u5fdmx5Ql76LTJe-9bFT8CLk51ViomdDUle9En~tX5VZceuMEro18EzcP8BCmu~pWncCmm7vO-HyGfgziTDDqcS92UvFMVYJsCA~eAC1B1g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
      progress: 50,
    },
  ]);
  return (
    <div>
      <h1>أفضل النوادي</h1>
      <div className="gyms">
        {gyms.map((gym) => (
          <GymCard key={gym.id} gym={gym} />
        ))}
      </div>
    </div>
  );
}

export default GymCards;
