import React from "react";
import GymImages from "../Components/GymImages";
import GymProfile from "../Components/GymProfile";

const gymData = {
  id: 1,
  gymName: "نادي فريندز للياقة البدنية",
  logo: "https://bit.ly/3yij5Wb",
  city: "غزة",
  description:
    ".نادي رياضي يحتوي على ملعب وميدان تنافسي وملعب رياضي, أوقات الدوام من 8-11 صباحا ومن 13-17 مساء",
  features: ["ميدان تنافسي", "ملعب رياضي"],
  progress: 75,
  images: [
    {
      pathUrl: "https://bit.ly/39s08Wv",
    },
    {
      pathUrl: "https://bit.ly/3kpe2e9",
    },
    {
      pathUrl: "https://bit.ly/3LxTj3Y",
    },
    {
      pathUrl: "https://bit.ly/3siJZsQ",
    },
    {
      pathUrl: "https://bit.ly/3KVru4l",
    },
  ],
  reviews: [
    {
      rate: 2,
      description: "للأسف كانت تجربة سيئ جدأ , لا أنصح به ",
      createdAt: "2022-05-08T14:15:25.265Z",
      userId: 3,
      user: {
        username: "حسن عبدالله",
        avatar: "https://bit.ly/38CU9xq",
      },
    },
    {
      rate: 1,
      description: "للأسف كانت تجربة سيئ جدأ , لا أنصح به ",
      createdAt: "2022-05-08T14:15:25.265Z",
      userId: 1,
      user: {
        username: "محمود علي",
        avatar: "https://bit.ly/37THiXV",
      },
    },
    {
      rate: 3,
      description: "للأسف كانت تجربة سيئ جدأ , لا أنصح به ",
      createdAt: "2022-05-08T14:15:25.266Z",
      userId: 2,
      user: {
        username: "علي محمود",
        avatar: "https://bit.ly/3EYZU4G",
      },
    },
  ],
};

export default function ProfileGym() {
  return (
    <>
      <div className="container">
        <GymProfile gymData={gymData} />
      </div>
      <div className="container bg__container imgfooter">
        <GymImages images={gymData.images} />
      </div>
    </>
  );
}
