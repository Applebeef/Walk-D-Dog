import { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const MapContainer = () => {
  const [region, setRegion] = useState(null);
  const [nearbyParks, setNearbyParks] = useState([]);
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
      setRegion(convertLocationToRegion(locationRes));

      getNearbyPlaces(
        locationRes.coords.latitude,
        locationRes.coords.longitude
      ).then((res) => {
        setNearbyParks(res.map((park) => createParkMarker(park)));
      });
      console.log(nearbyParks)
    })();
  }, []);

  const createParkMarker = (park) => {
    return (
      <MapView.Marker
        coordinate={{
          latitude: park.geometry.location.lat,
          longitude: park.geometry.location.lng,
        }}
        title={park.name}
        key={park.place_id}
      />
    );
  };

  //Send request to Google Places API to get nearby places
  const getNearbyPlaces = async (
    lat,
    lng,
    type = '"park"',
    keyword = '"Dog Park"'
  ) => {
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=${type}&keyword=${keyword}&key=${key}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson.results;
  };

  const convertLocationToRegion = (location) => {
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
        region={region}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        style={styles.map}
      >
        {nearbyParks}
      </MapView>
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
