import { Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function CardInputSearch() {
  const [searchGyms, setSearchGyms] = useState([]);
  const [isShowResult, setIsShowResult] = useState(false);
  const [search, setSearch] = useState("");

  const ref = useRef();

  const handleBlur = () => {
    setIsShowResult(false);
    setSearch("");
  };

  // function to handle Click Outside input search box
  useEffect(() => {
    const searchGymsHandler = async () => {
      setIsShowResult(true);

      // send request to server then set searchGyms to the response
      const { data } = await axios({
        method: "get",
        url: `/api/v1/gyms/search`,
        params: {
          q: search,
        },
      });

      setSearchGyms(data.slice(Math.max(data.length - 10, 0))); // get the last 10 results
    };

    if (search.length >= 1) {
      searchGymsHandler();
    }

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleBlur();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      setSearchGyms([]);
    };
  }, [search]);

  // function to handle Search and send to API
  const handleSearch = ({ target: { value } }) => setSearch(value);

  const renderSearch = () => {
    return (
      isShowResult && (
        <ul className="list-search">
          {searchGyms.length > 0 ? (
            searchGyms.map(({ id, gymName }, index) => (
              <li key={id}>
                <Link to={`/gyms/profile/${id}`} onClick={handleBlur}>
                  {gymName}
                </Link>
                {index !== searchGyms.length - 1 && <Divider />}
              </li>
            ))
          ) : (
            <li>
              <button type="button" onClick={handleBlur}>
                لا يوجد أي نوادي
              </button>
            </li>
          )}
        </ul>
      )
    );
  };

  return (
    <div className="search-container" ref={ref}>
      <input
        className="search-input"
        type="search"
        value={search}
        name="search"
        onChange={handleSearch}
        placeholder="ابحث عن طريق اسم النادي "
        autoComplete="off"
        onClose={handleBlur}
      />
      {renderSearch()}
    </div>
  );
}
