import RefreshButton from "./RefreshButton";

const HistoryData = ({ data, loading, onRefresh }) => {
  return (
    <div>
      <h2>History (10 latest)</h2>
       
      <RefreshButton onClick={onRefresh} />
      {loading && <p>Loading history...</p>}

      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item._id}>
              {new Date(item.timestamp).toLocaleTimeString()} — Temperature: {item.temperature.toFixed(2)}°/ Pressure: {(item.pressure / 100).toFixed(2)} hPa
            </li>
          ))}
        </ul>
      ) : (
        <p>No history loaded yet. Press Refresh.</p>
      )}
    </div>
  );
};

export default HistoryData;
