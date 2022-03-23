import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import Title from "./Title";
import ButtonsContainer from "./Buttons";
import MapContainer from "./MapContainer";

const MapPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Title />
        <MapContainer />
        <ButtonsContainer />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#93C47D",
      alignContent: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      position: "absolute",
      top: 40,
    },
    map: {},
    buttonsContainer: {
      position: "absolute",
      bottom: 10,
    },
  });
  