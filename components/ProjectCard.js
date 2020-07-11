import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ProjectCard = (props) => {
  return (
    <View style={{ ...styles.container }}>
      <Text>{props.name}</Text>
    </View>
  );
};

export default ProjectCard;

const styles = StyleSheet.create({
  container: {},
});
