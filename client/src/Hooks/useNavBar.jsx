import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function useNavBar() {
  const [searchGyms, setSearchGyms] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [search, setSearch] = useState("");
  const [isShowMenu, setIsShowMenu] = useState(false);

  const ref = useRef();

  const handleBlur = () => {
    setIsPending(false);
    setSearch("");
  };

  // function to handle Click Outside input search box
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handleBlur();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // function to set Is Show Menu or not
  const toggleDrawer = () => {
    setIsShowMenu(!isShowMenu);
  };

  // function to handle Search and send to API
  const handleSearch = async (event) => {
    setSearch(event.target.value);
    setIsPending(true);

    // send request to server then set searchGyms to the response
    const { data } = await axios({
      method: "get",
      url: `/api/v1/gyms/search?q=${event.target.value}`,
    });

    setSearchGyms(data.slice(Math.max(data.length - 10, 0))); // get the last 10 results
  };

  return {
    searchGyms,
    isPending,
    search,
    isShowMenu,
    toggleDrawer,
    handleSearch,
    ref,
    handleBlur,
  };
}
