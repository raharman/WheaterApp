import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import * as Location from "expo-location";
import moment from "moment-timezone";

import DateTimeBox from "./components/DateTimeBox";
import WheaterBox from "./components/WheaterBox";
import WheaterScroll from "./components/WheaterScroll";

const API_KEY = "7ffd6bc2f6313407cc66b09a8b053ae7";

export default function App() {
  const [data, setData] = useState({});

  const current = data.current;
  const timezone = data.timezone;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        fetchDataFromApi("40.7128", "-74.0060");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const fetchDataFromApi = (latitude, longitude) => {
    if (latitude && longitude) {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          /* console.log(data); */
          setData(data);
        });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/background.jpg")}
        style={styles.bgImage}
      >
        <DateTimeBox
          current={data.current}
          timezone={data.timezone}
          lat={data.lat}
          lon={data.lon}
        />
        <WheaterBox
          title="Vlhkosť: "
          value={current ? current.humidity : "28"}
          unit="%"
        />
        <WheaterBox
          title="Tlak: "
          value={current ? current.pressure : "1000"}
          unit=" hPa"
        />
        <WheaterBox
          title="Východ slnka: "
          value={
            current
              ? moment.tz(current.sunrise * 1000, timezone).format("HH:mm")
              : "4:00"
          }
          unit=""
        />
        <WheaterBox
          title="Západ slnka: "
          value={
            current
              ? moment.tz(current.sunset * 1000, timezone).format("HH:mm")
              : "19:00"
          }
          unit=""
        />

        <WheaterScroll weatherData={data.daily} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
