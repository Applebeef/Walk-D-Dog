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
import serverUtils from "./serverUtils";

function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of earth in kilometers.
  var dLat = ((lat2 - lat1) * Math.PI) / 180;
  var dLon = ((lon2 - lon1) * Math.PI) / 180;
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

async function getKey() {
  return fetch(
    `http://${serverUtils.constants.url}:${serverUtils.constants.port}/key/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "json/application",
      },
    }
  ).then((response) => response.text());
}

const MapContainer = ({ parkNavigate }) => {
  const [region, setRegion] = useState(null);
  const [nearbyParks, setNearbyParks] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [key, setKey] = useState("");

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
            handleNearbyParksUpdate(
              res.map((park) => {
                // console.log(park.name); //TODO delete this - testing
                // console.log(
                //   distance(
                //     park.geometry.location.lng,
                //     park.geometry.location.lat,
                //     location.coords.longitude,
                //     location.coords.latitude
                //   ) * 1000
                // );
                return createParkMarker(park);
              })
            );
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
          parkNavigate(park.place_id, park.name);
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
    let new_key = key;
    if (key === "") {
      new_key = await getKey();
      setKey(new_key);
    }
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=${type}&keyword=${keyword}&key=${new_key}`;
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
