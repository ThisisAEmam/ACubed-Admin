import React from "react";
import { StyleSheet, View } from "react-native";
import BackPress from "../hoc/BackPress";
import Loader from "../hoc/Loader";

const ServicesScreen = (props) => {
  return (
    <View style={styles.container}>
      <BackPress />
      <Loader visible={false} />
    </View>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
