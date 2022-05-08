import React from "react";
import { Link } from "react-router-dom";

// Component and Customs Hooks:
import useTopGyms from "../../Hooks/useTopGyms";
import GymCard from "../Card";

// Styled Components
import "./style.css";

function GymCards() {
  const { gyms, errors, isLoading } = useTopGyms();

  const renderGyms = () => {
    if (!errors && isLoading) {
      return <div>Loading...</div>;
    }
    if (!isLoading && errors) {
      return <div>Error...</div>;
    }
    if (!isLoading && !errors && gyms.length === 0) {
      return <div>No gyms found</div>;
    }
    return gyms.map((gym) => <GymCard key={gym.id} gym={gym} />);
  };

  return (
    <div className="container">
      <div className="sub__container">
        <div className="top-container">
          <h1 className="title_top__rating">أفضل النوادي</h1>
          <Link to="gyms/search">
            <h3>تصنيف</h3>
          </Link>
        </div>
        <div className="top__rating__gyms">{renderGyms()}</div>
      </div>
    </div>
  );
}

export default GymCards;
