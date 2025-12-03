import { useLatestSensorData } from "./hooks/useLatestSensorData";
import { useSensorHistory } from "./hooks/useSensorHistory";
import { useAverage } from "./hooks/useAverage";
import LatestData from "./components/LatestData";
import HistoryData from "./components/HistoryData";
import AverageData from "./components/AverageData";
import Alerts from "./components/Alerts";

const App = () => {
  const { data, loading: latestLoading } = useLatestSensorData(2000);
  const { history, loading: historyLoading, refresh } = useSensorHistory();
  const { avg, loading: avgLoading } = useAverage();

  return (
    <div>
      <h1>BMP280 Sensor Data</h1>

      <LatestData data={data} loading={latestLoading} />

      <AverageData data={avg} loading={avgLoading}/>

      <HistoryData
        data={history}
        loading={historyLoading}
        onRefresh={refresh}
      />
      <Alerts data={data} />
    </div>
  );
};

export default App;