import { useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import Geocoder from "react-native-geocoding";

const MapContainer = (props) => {
  Geocoder.init(props.apiKey); // TODO restrict api key. 

  let list = Geocoder.from("dog park").then((json) => {//FIXME
    var location = json.results[0].geometry.location;
    console.log(location);
  });

  const convertLocationToRegion = () => {
    return {
      latitude: props.location?.coords.latitude,
      longitude: props.location?.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    };
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        region={convertLocationToRegion()}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        style={styles.map}
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "black",
  },
  map: {
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.58,
  },
});

export default MapContainer;
