import React from "react";
import { View, ScrollView, Text, Image, StyleSheet } from "react-native";
import moment from "moment-timezone";

const WheaterScroll = ({ weatherData }) => {
  return (
    <ScrollView horizontal={true} style={styles.scroll}>
      <CurrentTemp
        data={weatherData && weatherData.length > 0 ? weatherData[0] : {}}
      />
      <Forecast data={weatherData} />
    </ScrollView>
  );
};

const CurrentTemp = ({ data }) => {
  if (data && data.weather) {
    return (
      <View style={styles.currentTempContainer}>
        <Image
          source={{
            uri:
              "http://openweathermap.org/img/wn/" +
              data.weather[0].icon +
              "@2x.png",
          }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.day}>
            {moment(data.dt * 1000).format("dddd")}
          </Text>
          <Text style={styles.temp}>Day - {data.temp.day}&#176;C</Text>
          <Text style={styles.temp}>Night - {data.temp.night}&#176;C</Text>
        </View>
      </View>
    );
  } else {
    return <View></View>;
  }
};

const Forecast = ({ data }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {data && data.length > 0 ? (
        data.map(
          (data, id) =>
            id !== 0 && <ForecastItem forecastItemData={data} key={id} />
        )
      ) : (
        <View></View>
      )}
    </View>
  );
};

const ForecastItem = ({ forecastItemData }) => {
  return (
    <View style={styles.forecastContainer}>
      <Image
        style={styles.forecastImage}
        source={{
          uri:
            "http://openweathermap.org/img/wn/" +
            forecastItemData.weather[0].icon +
            "@2x.png",
        }}
      />
      <Text style={styles.forecastDay}>
        {moment(forecastItemData.dt * 1000).format("dddd")}
      </Text>
      <Text style={styles.forecastTemp}>
        Day - {forecastItemData.temp.day}&#176;C
      </Text>
      <Text style={styles.forecastTemp}>
        Night - {forecastItemData.temp.night}&#176;C
      </Text>
    </View>
  );
};

export default WheaterScroll;

const styles = StyleSheet.create({
  image: {
    width: 125,
    height: 125,
  },
  scroll: {
    /* flex: 1, */
    backgroundColor: "rgba(50, 50, 59, 0.7)",
    padding: 30,
    maxHeight: 250,
  },
  currentTempContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.40)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 1,
    padding: 15,
  },
  textContainer: {
    paddingRight: 20,
  },
  day: {
    fontSize: 20,
    color: "#fff",
    backgroundColor: "#3c3c44",
    padding: 8,
    borderRadius: 50,
    fontWeight: "200",
    marginBottom: 16,
    alignSelf: "center",
  },
  temp: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "100",
    textAlign: "center",
  },
  forecastContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.40)",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    padding: 50,
    marginLeft: 10,
  },
  forecastImage: {
    height: 90,
    width: 90,
  },
  forecastDay: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#3c3c44",
    borderRadius: 50,
    fontWeight: "200",
    marginBottom: 12,
    alignSelf: "center",
    padding: 8,
  },
  forecastTemp: {
    fontSize: 12,
    color: "white",
    fontWeight: "100",
    textAlign: "center",
  },
});
