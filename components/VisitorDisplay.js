import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { DogDisplay } from "./DogDisplay";

const VisitorDisplay = ({ visitor_name, dog_names }) => {
  let dogDisplayArray = dog_names.map((dog_name) => (
    <DogDisplay dog_name={dog_name} />
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.visitorDisplay}>{visitor_name}</Text>
      <View style={styles.dog_container}>{dogDisplayArray}</View>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
  },
  dog_container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
  },
  visitorDisplay: {
    fontSize: 25,
    textDecorationStyle: "solid",
  },
  dogDisplay: {
    fontSize: 20,
  },
});

export default VisitorDisplay;
