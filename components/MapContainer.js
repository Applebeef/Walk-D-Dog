import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

const MapContainer = ({ navigation }) => {
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
      let locationRes = await Location.getCurrentPositionAsync({}).then(
        (location) => {
          convertLocationToRegion(location);
          getNearbyPlaces(
            location.coords.latitude,
            location.coords.longitude
          ).then((res) => {
            handleNearbyParksUpdate(res.map((park) => createParkMarker(park)));
          });
        }
      );
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
        onPress={() => {
          alert(park.name);
        }}
      ></MapView.Marker>
    );
  };

  const handleNearbyParksUpdate = (parks) => {
    setNearbyParks(parks);
  };

  //Send request to Google Places API to get nearby places
  const getNearbyPlaces = async (
    lat,
    lng,
    type = '"park"',
    keyword = '"dog park"'
  ) => {
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=${type}&keyword=${keyword}&key=${key}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson.results;
  };

  const convertLocationToRegion = (location) => {
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.015,
    });
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        region={region}
        provider={"google"}
        showsUserLocation={true}
        showsPointsOfInterest={false}
        customMapStyle={mapStyle}
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

const mapStyle = [
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
];

export default MapContainer;
