const LatestData = ({ data, loading }) => {
  
  if (loading) return <p>Loading latest data...</p>;
  if (!data) return <p>No data available</p>;

  return (
    <div>
      <h2>Latest Reading</h2>
      <p>
        Temperature: {data.temperature}°
      </p>
      <p>
        Pressure: {data.pressure / 100} hPa
      </p>
      <p>
        Timestamp: {new Date(data.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default LatestData;