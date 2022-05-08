import { useEffect, useState } from "react";
import axios from "axios";

export default function useTopGyms() {
  const [gyms, setGyms] = useState([]);
  const [errors, setErrors] = useState(false);
  const [isLoading, serIsLoading] = useState(false);

  const getGyms = async () => {
    serIsLoading(true);
    try {
      const {
        status,
        data: { topReviewGyms },
      } = await axios("/api/v1/gyms/top");
      if (status !== 200) throw new Error("Failed to fetch gyms");
      serIsLoading(false);
      setGyms(topReviewGyms);
    } catch (error) {
      setErrors(true);
    }
  };

  useEffect(() => {
    getGyms();
    return () => {
      setGyms([]);
      setErrors(false);
      serIsLoading(false);
    };
  }, []);

  return { gyms, errors, isLoading };
}
