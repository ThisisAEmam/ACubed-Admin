import React, { useContext } from "react";
import { StyleSheet, AsyncStorage, TouchableOpacity, Text, Alert, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import LoginScreen from "./pages/LoginScreen";
import HomeScreen from "./pages/HomeScreen";
import { Context } from "./context/Context";
import Colors from "./Colors";
import ServicesScreen from "./pages/ServicesScreen";
import ProjectsScreen from "./pages/ProjectsScreen";

const { width, height } = Dimensions.get("window");

const Stack = createStackNavigator();

const Layout = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          ...TransitionPresets.SlideFromRightIOS,
          headerTitleAlign: "center",
          headerStyle: { height: 100, backgroundColor: "#f0f0f0" },
          headerTitleStyle: { color: Colors.primary, fontSize: width / 20, fontWeight: "600", marginTop: 10 },
          headerRight: () => <HeaderRight />,
          headerTintColor: Colors.primary,
          headerLeftContainerStyle: { marginTop: 10, marginLeft: 10, transform: [{ scale: 1.3 }] },
          headerRightContainerStyle: { marginRight: 20, marginTop: 10 },
        }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }} />
        <Stack.Screen name="Services" component={ServicesScreen} />
        <Stack.Screen name="Projects" component={ProjectsScreen} />
        <Stack.Screen name="Feedbacks" component={ServicesScreen} />
        <Stack.Screen name="Members" component={ServicesScreen} />
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

  return (
    <TouchableOpacity onPress={backAction}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutText: {
    fontSize: width / 24.55,
    fontWeight: "700",
    color: Colors.primary,
  },
});
