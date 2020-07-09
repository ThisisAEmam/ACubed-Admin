import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import LoginScreen from "./app/LoginScreen";

const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export default function App() {
  const [isReady, setReady] = useState(false);

  async function _loadAssetsAsync() {
    const imageAssets = cacheImages([require("./assets/homeBG.png")]);
    await Promise.all([...imageAssets]);
  }

  const loginScreen = !isReady ? <AppLoading startAsync={_loadAssetsAsync} onFinish={() => setReady(true)} onError={console.warn} /> : <LoginScreen />;

  return loginScreen;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
