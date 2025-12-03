const AverageData = ({ data, loading }) => {

  if (loading) return <p>Loading average...</p>;
  if (!data) return <p>No data for average.</p>;

  return (
    <div>
      <h2>Average of last {data.count} measurements</h2>
      <p>Temperature avg: {data.temperatureAvg.toFixed(2)}°C</p>
      <p>Pressure avg: {(data.pressureAvg / 100).toFixed(2)} hPa</p>
    </div>
  );
};

export default AverageData;