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
    if (isLoading && !errors) {
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
    <div className="container-full-width">
      <div className="container">
        <div className="top-container">
          <h1>أفضل النوادي</h1>
          <Link to="gyms/search">
            <h3>تصنيف</h3>
          </Link>
        </div>
        {errors && <h1>Failed to fetch gyms</h1>}
        {isLoading && <h1>isLoading...</h1>}
        <div className="gyms">{renderGyms()}</div>
      </div>
    </div>
  );
}

export default GymCards;
