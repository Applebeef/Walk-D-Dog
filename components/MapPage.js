import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Title from "./Title";
import MapContainer from "./MapContainer";

const MapPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title />
      </View>
      <View style={styles.map}>
        <MapContainer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  map: {},
  buttonsContainer: {
    position: "absolute",
    bottom: 10,
  },
});

export default MapPage;
