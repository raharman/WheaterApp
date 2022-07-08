import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";

const WheaterBox = ({ title, value, unit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wheaterCard}>
        <Text style={styles.cardText}>{title}</Text>
        <Text style={styles.cardText}>
          {value}
          {unit}
        </Text>
      </View>
    </View>
  );
};

export default WheaterBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  wheaterCard: {
    backgroundColor: "rgba(0, 0, 0, 0.40)",
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    width: 350,
    padding: 5,
  },
  cardText: {
    fontSize: 24,
    color: "white",
  },
});
