/* eslint-disable  */
import React from 'react';

import { useGetTopGymsQuery } from '../../Store/Services/gyms';  
import { Link } from 'react-router-dom';

import GymCard from '../Card';
import LoadingCard from './LoadingCard';

// Styled Components
import './style.css';

function GymCards({page}) {
  const CardsTitle = ()=>{
    if (page ==="HomePage") return "أفضل النوادي";
    if (page === "ProfileGym") return " نوادي مشابهة";
  }
  const isShowSearch = () =>{
    return page ==="HomePage";
  }
  const { data, isLoading, isSuccess, isError } = useGetTopGymsQuery();
  
  
  const renderGyms = () => {
    if (isLoading) {
      const loadingCards = new Array(3).fill(null);
      return loadingCards.map((_, index) => <LoadingCard key={index} id={index + 1} />);
    }
    if (isError) 
      return <div className='error__card'> عذرا هناك خطأ , أعد تحديث الصفحة </div>;

    const {topReviewGyms} = data;
    if (isSuccess && topReviewGyms.length === 0)
      return <div className='error__card'>  لا يوجد أي نوادي , أعد تحديث الصفحة </div>;
    
    return topReviewGyms.map((gym) => <GymCard key={gym.id} gym={gym} />);
   
  };

  return (
    <div className="bg__container container">
      <div className="sub__container">
        <div className="top-container">
          <h1 className="title_top__rating">{CardsTitle()}</h1>
          {isShowSearch() && (<Link to="gyms/search">
            <h3>تصنيف</h3>
          </Link>)}
        </div>
        <div className="top__rating__gyms">{renderGyms()}</div>
      </div>
    </div>
  );
}

export default GymCards;
