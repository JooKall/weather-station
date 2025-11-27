# Weather Station Project

This project uses a **Raspberry Pi Pico W running MicroPython**, a **BMP280 sensor**, **MQTT (HiveMQ Cloud)**, a **Node.js backend with MongoDB** and a **React frontend** to measure, transmit, store and display real-time weather data.

---

## How it works

1. **Raspberry Pi Pico W (MicroPython)**

   - Connects to Wi-Fi.
   - Reads temperature & pressure using **BMP280 (I2C)**.
   - Converts data to JSON.
   - Publishes measurements to **HiveMQ Cloud** using MQTT.
   - Uses topic:
     `weatherstation/data`
   - Example JSON payload sent:
     ```json
     {
       "station": "station1",
       "temperature": 23.8,
       "pressure": 100375.2
     }
     ```

2. **Backend (Node.js + Express + MongoDB + MQTT client)**

   The backend does two things:

   **A. Listens to MQTT messages:**

   - Connects to HiveMQ Cloud.
   - Subscribes to weatherstation/#.
   - Parses MQTT JSON payloads.
   - Saves them into MongoDB.

   **B. Provides REST API endpoints:**

   - Endpoints to fetch the data:
   - `GET /api/sensor/latest` → latest sensor reading
   - `GET /api/sensor` → last 10 readings

3. **React frontend**
   - Fetches JSON data from backend periodically.
   - Displays:
     - Temperature in Celsius
     - Pressure (hPa)
     - History (10 latest values)
   - Example UI:
     ```
     Temperature: 23.8 °C
     Pressure: 1003.75 hPa
     Timestamp: xx.xx.xx
     ```

---

## How to run

### Setting Up MicroPython on Raspberry Pi Pico W

If your Raspberry Pi Pico W does not already have MicroPython installed, follow these steps:
1. Download MicroPython Firmware
    1. Visit the official MicroPython website
    2. Download the latest `.uf2` file for **Raspberry Pi Pico W**.
2. Flash MicroPython to the Pico W
    1. Hold down the **BOOTSEL** button on the Pico.
    2. While holding the button, plug the Pico into your computer via USB.
    3. Release the BOOTSEL button.
    4. A new USB drive should appear.
    5. Drag and drop the downloaded `.uf2` file onto the drive.
    6. The Pico will reboot and reconnect and now run MicroPython.
    *You should not see the drive anymore: it only appears in BOOTSEL mode.*
3. Connect Using Thonny
    1. Open the **Thonny IDE**.
    2. Select interpreter:  
      **Run -> Configure Interpreter -> MicroPython (Raspberry Pi Pico)**
    3. Click **Stop/Restart backend** to confirm the connection (red stop button).

### Raspberry Pi Pico W (MicroPython)

1. Open the Python file from `/thonny/weatherstation.py` in **Thonny**.
2. Upload these files to your Pico if not already there:
    ```
    config.py
    bmp280.py
    umqtt.simple.py
    umqtt.robust.py
    ```
3. Configure your config.py:
   ```
   ssid = "YOUR_WIFI_NAME"
   pwd = "YOUR_WIFI_PASSWORD"
   MQTT_BROKER = "xxxxxxx.s1.eu.hivemq.cloud"
   MQTT_PORT = 8883
   MQTT_USER = "your_mqtt_user"
   MQTT_PWD = "your_mqtt_password"
   ```
4. Run main.py in Thonny (green play button).

### Backend

1. Navigate to the backend folder: `/weather-station-backend`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in .env:
   ```env
   PORT=3001
   MONGODB_URI=<your_mongodb_connection_string>
   HIVE_USERNAME=<your_hivemq_username>
   HIVE_PWD=<your_hivemq_password>
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
5. You should see:
   ```
   connecting to MongoDB
   Server running on port 3001
   Connected to HiveMQ Cloud!
   Subscribed to weather topics
   connected to MongoDB
   Received JSON: { <values> }
   ```

### React frontend

1. Navigate to the backend folder: `/weather-station-frontend`.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start development server:
    ```bash
    npm run dev
    ```
4. Access the frontend in your browser (http://localhost:5173 if using Vite default).

---

## Using the Weather Station

Once all components are running:

1. The Pico W publishes data via MQTT.
2. The backend stores data in MongoDB.
3. The React UI displays real-time values.

Everything updates automatically.
