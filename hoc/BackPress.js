import React from "react";
import { View, BackHandler } from "react-native";
import { Context } from "../context/Context";
import * as RootNavigation from "../RootNavigation";

const BackPress = () => {
  const { setBackPressCount } = React.useContext(Context);
  React.useEffect(() => {
    const backAction = () => {
      setBackPressCount(0);
      RootNavigation.navigate("Home");
    };
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, []);
  return <View></View>;
};

export default BackPress;
