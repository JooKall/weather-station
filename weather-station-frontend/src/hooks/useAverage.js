import { useState, useEffect } from "react";

export const useAverage = (count = 10, intervalMs = 5000) => {
  const [avg, setAvg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvg = async () => {
      try {
        const res = await fetch(`/api/sensorData/average/${count}`);
        const json = await res.json();
        setAvg(json);
        setLoading(false);
      } catch (err) {
        console.error("Average fetch error:", err);
        setLoading(false);
      }
    };

    fetchAvg();
    const interval = setInterval(fetchAvg, intervalMs);
    return () => clearInterval(interval);
  }, [count, intervalMs]);

  return { avg, loading };
};
