import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Title from "./Title";

function Profile() {
  const [name, setName] = useState("null");
  const [dogs, setDogs] = useState("null");

  return (
    <View style={styles.container}>
      <Title />
      <Text>{name}</Text>
      <Text>Dogs:</Text>
      <Text>{dogs}</Text>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Profile;
