import React, { useEffect, useContext } from "react";
import { StyleSheet, View, Alert, BackHandler, AsyncStorage, FlatList } from "react-native";
import { Context } from "../context/Context";
import HomeCard from "../components/HomeCard";
import Cards from "../data/Cards";

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

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert("Hold on!", "Are you sure you want to logout?", [
  //       {
  //         text: "Cancel",
  //         onPress: () => null,
  //         style: "cancel",
  //       },
  //       { text: "YES", onPress: () => logout() },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

  //   return () => backHandler.remove();
  // }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={Cards}
        keyExtractor={(item) => item.name}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <HomeCard name={item.name} backgroundColor={item.backgroundColor} textColor={item.textColor} homeProps={props} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#f5f5f5",
  },
});
