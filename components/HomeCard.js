import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import * as RootNavigation from "../RootNavigation";
import Feedbacks from "../assets/Feedbacks.svg";
import Services from "../assets/Services.svg";
import Projects from "../assets/Projects.svg";
import Members from "../assets/Members.svg";

const { width, height } = Dimensions.get("window");

const HomeCard = (props) => {
  let image;
  switch (props.name) {
    case "Services":
      image = <Services height={height / 6.6} />;
      break;

    case "Projects":
      image = <Projects height={height / 6.6} />;
      break;

    case "Feedbacks":
      image = <Feedbacks height={height / 6.6} />;
      break;

    case "Members":
      image = <Members height={height / 6.6} />;
      break;

    default:
      break;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        RootNavigation.navigate(props.name);
      }}>
      <View style={{ ...styles.container, backgroundColor: props.backgroundColor }}>
        <View style={styles.imageContainer}>{image}</View>
        <Text style={{ ...styles.name, color: props.textColor }}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCard;

const styles = StyleSheet.create({
  container: {
    height: height / 4.2,
    borderRadius: 10,
    width: width - 40,
    marginVertical: 10,
  },
  name: {
    marginTop: "auto",
    marginBottom: 15,
    marginLeft: 20,
    fontSize: width / 12.25,
    fontWeight: "700",
  },
  imageContainer: {
    marginTop: 20,
    width: width / 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
});
