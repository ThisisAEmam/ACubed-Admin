import React, { useEffect, useContext } from "react";
import { StyleSheet, Text, View, Alert, BackHandler, AsyncStorage } from "react-native";
import { Context } from "../context/Context";

const HomeScreen = (props) => {
  const { isLoggedIn, setLoggedIn } = useContext(Context);

  const saveInStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      setLoggedIn(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    !isLoggedIn ? props.navigation.navigate("Login") : null;
  }, [isLoggedIn]);

  const logout = () => {
    saveInStorage("loggedIn", "false");
    setLoggedIn(false);
    props.navigation.navigate("Login");
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => logout() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => backHandler.remove();
  }, []);
  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
