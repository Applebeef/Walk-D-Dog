import { Text, View, Image, StyleSheet } from "react-native";
import React from "react";

const DogDisplay = ({ dog_name, dog_image }) => {
  return (
    <View style={styles.dogDisplay}>
      <Text style={styles.dogDisplay}>{dog_name}</Text>
      <Image
        source={{ uri: dog_image }}
        style={{ width: 80, height: 60, borderRadius: 20 }}
      />
    </View>
  );
};

styles = StyleSheet.create({
  dogDisplay: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
    borderWidth: 1,
    borderRadius: 20,
  },
});

export default DogDisplay;
