import { StyleSheet, View, Image } from "react-native";

const MapContainer = () => {
  return (
    <View style={styles.map}>
      <Image source={require("../assets/Map-Placeholder.png")}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    alignContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    transform: [{ scale: 0.7 }],
  },
});

export default MapContainer;
