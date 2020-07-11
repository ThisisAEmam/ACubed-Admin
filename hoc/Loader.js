import React from "react";
import { StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Colors from "../Colors";

const Loader = (props) => {
  return (
    <Spinner cancelable={true} visible={props.visible} textContent={"Loading..."} textStyle={styles.spinnerTextStyle} color={Colors.primary} size="large" />
  );
};

export default Loader;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: Colors.bgDarkDark,
  },
});
