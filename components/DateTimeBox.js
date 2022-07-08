import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
/* import moment from "moment-timezone"; */

const DateTimeBox = ({ lat, lon, timezone }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    setInterval(() => {
      const time = new Date();
      const month = time.getMonth();
      const date = time.getDate();
      const day = time.getDay();
      const hour = time.getHours();
      const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
      const minutes = time.getMinutes();
      const ampm = hour >= 12 ? "pm" : "am";

      setTime(
        (hoursIn12HrFormat < 10 ? "0" + hoursIn12HrFormat : hoursIn12HrFormat) +
          ":" +
          (minutes < 10 ? "0" + minutes : minutes) +
          ampm
      );

      setDate(days[day] + ", " + date + " " + months[month]);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.header}>{time}</Text>
          <Text style={styles.subHeader}>{date}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.header}>{timezone}</Text>
        <Text style={styles.subHeader}>
          {lat} {lon}
        </Text>
      </View>
    </View>
  );
};

export default DateTimeBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 75,
  },
  header: {
    fontSize: 32,
    color: "white",
    fontWeight: "100",
  },
  subHeader: {
    fontSize: 24,
    color: "white",
    fontWeight: "100",
  },
});
