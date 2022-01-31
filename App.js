import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapContainer from "./components/Map";
import Title from "./components/Title";
import ButtonsContainer from "./components/Buttons";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title />
      </View>
      <View style={styles.map}>
        <MapContainer />
      </View>
      <View style={styles.buttonsContainer}>
        <ButtonsContainer/>
      </View>
    </View>
  );
}

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
    top: 30,
  },
  map: {},
  buttonsContainer:{
    position: "absolute",
    bottom: 40,
  },
});
