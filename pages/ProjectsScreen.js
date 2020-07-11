import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import BackPress from "../hoc/BackPress";
import Loader from "../hoc/Loader";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
import PageNumber from "../components/PageNumber";

const ProjectsScreen = (props) => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const fetchData = (noOfPages) => {
    axios
      .all([axios.get("/projects/?page=1"), axios.get("/projects/?page=2")])
      .then((res) => {
        let response = res[0].data.results.concat(res[1].data.results);
        setData(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get("/projects")
      .then((res) => setCount(res.data.count))
      .catch((error) => console.error(error));

    fetchData(2);
  }, []);

  return (
    <View style={styles.container}>
      <BackPress />
      <Loader visible={false} />
      {data.length !== 0 ? (
        data.map((item) => {
          return <ProjectCard key={item.id} id={item.id} name={item.name} />;
        })
      ) : (
        <Text>Data unfetched</Text>
      )}
      <PageNumber number="1" />
    </View>
  );
};

export default ProjectsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
