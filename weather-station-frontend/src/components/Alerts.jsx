const Alerts = ({data}) => {
  
    if (!data) return <p>No data available</p>;

  const alerts = [];
  if (data.temperature > 25) {
    alerts.push("High Temperature Alert!");
  }
  if (data.pressure > 104000) {
    alerts.push("High Pressure Alert!");
  }

  if (data.pressure < 98000) {
    alerts.push("Low Pressure Alert!");
  }

  if (alerts.length === 0) {
    alerts.push("No alerts.");
  }

  return (
    <div>
      <h2>Alerts</h2>
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;