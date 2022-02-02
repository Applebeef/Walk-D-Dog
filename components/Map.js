import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import Geocoder from "react-native-geocoding";

const MapContainer = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const key = "AIzaSyAHx3VwmotBdOTNMMup8VE5ZoTYC1aGQkA";

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        console.log(errorMsg);
        return;
      }
      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
    Geocoder.init(key);
    Geocoder.from("dog park", {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }).then((json) => {
      console.log(json);
    });
  }, []);

  const convertLocationToRegion = () => {
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
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
