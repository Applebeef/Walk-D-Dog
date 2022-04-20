import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Title from "./Title";
import serverUtils from "./serverUtils";
import CustomButton from "./CustomButton";

const fetchPark = async (id) => {
  const response = await fetch(
    `http://${serverUtils.constants.url}:${serverUtils.constants.port}/park/get/${id}`,
    {
      method: "GET",
    }
  );
  const json = await response.json();
  return json;
};

const ParkPage = ({ route, navigation }) => {
  const [parkVisitors, setParkVisitors] = useState([]);

  useEffect(() => {
    fetchPark(route.params.id).then((json) => {
      setParkVisitors(json);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Title />
      <Text>{route.params.name}</Text>
      <Text>{parkVisitors}</Text>
      <CustomButton onPress={() => navigation.goBack()} text={"Go back"} />
    </View>
  );
};

export default ParkPage;
