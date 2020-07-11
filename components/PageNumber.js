import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../Colors";

const PageNumber = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.number}</Text>
    </View>
  );
};

export default PageNumber;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 50,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  number: {
    fontSize: 18,
    color: "white",
  },
});
