import React, { useEffect, useState, useRef, useContext } from "react";
import { Context } from "../context/Context";
import { StyleSheet, Text, View, Image, Dimensions, TextInput, TouchableOpacity, BackHandler, Alert, AsyncStorage } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Colors from "../Colors";

const { Value, event, block, cond, eq, set, Clock, startClock, stopClock, timing, debug, clockRunning, interpolate, Extrapolate, concat } = Animated;
const { width, height } = Dimensions.get("window");

const runTiming = (clock, value, dest) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };
  const config = {
    duration: 1000,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
    useNativeDriver: true,
  };
  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug("stop clock", stopClock(clock))),
    state.position,
  ]);
};

const LoginScreen = (props) => {
  const { isLoggedIn, setLoggedIn } = useContext(Context);

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit ACubed admin dashboard app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, []);

  const [wrongCred, setWrongCred] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const buttonOpacity = useRef(new Value(1)).current;
  const onStateChange = event([
    {
      nativeEvent: ({ state }) => block([cond(eq(state, State.END), set(buttonOpacity, runTiming(new Clock(), 1, 0)))]),
    },
  ]);

  const onCloseState = event([
    {
      nativeEvent: ({ state }) => block([cond(eq(state, State.END), set(buttonOpacity, runTiming(new Clock(), 0, 1)))]),
    },
  ]);

  const buttonY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const bgY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 2.5, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const logoY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [-height / 14, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const loginSectionZindex = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, -1],
    extrapolate: Extrapolate.CLAMP,
  });

  const loginSectionOpacity = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const loginSectionY = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [0, height / 2.5],
    extrapolate: Extrapolate.CLAMP,
  });

  const rotateCross = interpolate(buttonOpacity, {
    inputRange: [0, 1],
    outputRange: [180, 360],
    extrapolate: Extrapolate.CLAMP,
  });

  const saveInStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      alert(err);
    }
  };

  const getFromStorage = async (key) => {
    try {
      let login = await AsyncStorage.getItem(key);
      if (login !== null) {
        login = login === "true" ? true : false;
        if (login) {
          setLoggedIn(true);
          props.navigation.navigate("Home");
        }
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getFromStorage("loggedIn", props);
  }, []);

  const signinHandler = () => {
    const realEmail = "abdo";
    const realPassword = "123";
    if (realEmail === email && realPassword === password) {
      setWrongCred(false);
      setLoggedIn(true);
      saveInStorage("loggedIn", "true");
      props.navigation.navigate("Home");
    } else {
      setWrongCred(true);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...StyleSheet.absoluteFill, transform: [{ translateY: bgY }] }}>
        <Image source={require("../assets/homeBG.png")} style={styles.image} />
      </Animated.View>
      <Animated.View style={{ ...styles.logoContainer, transform: [{ translateY: logoY }] }}>
        <Image source={require("../assets/LogoWhiteWEB.png")} style={styles.logo} resizeMode="contain" />
      </Animated.View>
      <View style={styles.buttonContainer}>
        <TapGestureHandler onHandlerStateChange={onStateChange}>
          <Animated.View style={{ ...styles.button, opacity: buttonOpacity, transform: [{ translateY: buttonY }] }}>
            <Text style={styles.signInText}>SIGN IN</Text>
          </Animated.View>
        </TapGestureHandler>
        <Animated.View
          style={{
            ...styles.loginSection,
            ...StyleSheet.absoluteFill,
            opacity: loginSectionOpacity,
            transform: [{ translateY: loginSectionY }],
            zIndex: loginSectionZindex,
          }}>
          <TapGestureHandler onHandlerStateChange={onCloseState}>
            <Animated.View style={styles.closeButton}>
              <Animated.Text style={{ fontSize: 20, transform: [{ rotate: concat(rotateCross, "deg") }] }}>X</Animated.Text>
            </Animated.View>
          </TapGestureHandler>
          <TextInput
            placeholder="Email"
            placeholderTextColor={wrongCred ? "red" : "#555"}
            style={[styles.textInput, wrongCred ? styles.wrongCred : null]}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={wrongCred ? "red" : "#555"}
            style={[styles.textInput, wrongCred ? styles.wrongCred : null]}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          {wrongCred ? <Text style={styles.wrongEmailPassword}>Wrong Email or password. Please check and retry.</Text> : null}
          <TouchableOpacity onPress={signinHandler}>
            <Animated.View style={[styles.button, styles.InternalButton]}>
              <Text style={{ ...styles.signInText, color: "#FFF" }}>SIGN IN</Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
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
    width: 250,
  },
  buttonContainer: {
    height: height / 2.5,
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
  loginSection: {
    height: height / 2.5,
    top: 0,
    justifyContent: "center",
  },
  closeButton: {
    height: 40,
    width: 40,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -20,
    left: width / 2 - 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 5,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    paddingLeft: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "rgba(0,0,0,0.2)",
  },
  wrongCred: {
    borderColor: "red",
  },
  wrongEmailPassword: {
    fontSize: 12,
    fontWeight: "500",
    color: "red",
    marginHorizontal: 30,
  },
  InternalButton: {
    backgroundColor: Colors.primary,
    marginTop: 20,
    marginHorizontal: 20,
  },
});
