import React, { useEffect, useContext, useState } from "react";
import { StyleSheet, View, Alert, BackHandler, AsyncStorage, FlatList } from "react-native";
import { Context } from "../context/Context";
import HomeCard from "../components/HomeCard";
import Cards from "../data/Cards";

const HomeScreen = (props) => {
  const { isLoggedIn, backPressCount, setBackPressCount } = useContext(Context);

  useEffect(() => {
    !isLoggedIn ? props.navigation.navigate("Login") : null;
  }, [isLoggedIn]);

  useEffect(() => {
    const backAction = () => {
      setBackPressCount(backPressCount + 1);
      if (backPressCount === 1) {
        setBackPressCount(0);
        Alert.alert("Hold on!", "Are you sure you want to exit ACubed admin dashboard app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]);
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [backPressCount]);

  return (
    <View style={styles.container}>
      <FlatList
        data={Cards}
        keyExtractor={(item) => item.name}
        horizontal={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <HomeCard name={item.name} backgroundColor={item.backgroundColor} textColor={item.textColor} />}
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
