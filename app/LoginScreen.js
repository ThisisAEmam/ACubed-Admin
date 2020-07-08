import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ ...StyleSheet.absoluteFill }}>
        <Image source={require("../assets/homeBG.png")} style={styles.image} />
      </View>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/LogoWhiteWEB.png")} style={styles.logo} resizeMode="contain" />
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  logoContainer: {
    flex: 1,
    height: height,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 150,
    width: 150,
  },
  buttonContainer: {
    height: height / 4,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 15,
    marginHorizontal: 50,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  signInText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
