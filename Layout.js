import React, { useContext, useEffect } from "react";
import { StyleSheet, Button, AsyncStorage, TouchableOpacity, Text, Icon } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets, HeaderBackButton } from "@react-navigation/stack";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import { Context } from "./context/Context";
import Colors from "./Colors";

const Stack = createStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          ...TransitionPresets.SlideFromRightIOS,
          headerTitleAlign: "center",
          headerStyle: { height: 100, backgroundColor: Colors.primary },
          headerTitleStyle: { color: "white", fontSize: 24, marginTop: 10 },
          headerRight: () => <HeaderRight />,
          headerTintColor: "white",
          headerLeftContainerStyle: { marginTop: 10 },
          headerRightContainerStyle: { marginRight: 20 },
        }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;

const HeaderRight = () => {
  const { setLoggedIn } = useContext(Context);

  const saveInStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      setLoggedIn(false);
    } catch (err) {
      alert(err);
    }
  };
  const logout = () => {
    saveInStorage("loggedIn", "false");
    setLoggedIn(false);
  };
  return (
    <TouchableOpacity onPress={logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginTop: 10,
  },
});
