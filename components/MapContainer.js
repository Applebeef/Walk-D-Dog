import {useEffect, useState} from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import serverUtils from "./serverUtils";

const PARK_ENTER_TASK = "ParkEnter"

function distance(lon1, lat1, lon2, lat2) {
    let R = 6371; // Radius of earth in kilometers.
    let dLat = ((lat2 - lat1) * Math.PI) / 180;
    let dLon = ((lon2 - lon1) * Math.PI) / 180;
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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

TaskManager.defineTask(PARK_ENTER_TASK, ({data: {eventType, region}, error}) => {
    if (error) {
        // check `error.message` for more details.
        return;
    }
    console.log(region)
    if (eventType === Location.GeofencingEventType.Enter) {
        console.log("You've entered region:", region);
    } else if (eventType === Location.GeofencingEventType.Exit) {
        console.log("You've left region:", region);
    }
});

async function updateRegionsTasks(parks) {
    const RADIUS = 40; //radius in meters
    let regions = parks.map((park) => {
        return {
            id: park.place_id,
            latitude: park.geometry.location.lat,
            longitude: park.geometry.location.lng,
            radius: RADIUS,
        };
    });
    await Location.startGeofencingAsync(PARK_ENTER_TASK, regions);
}

const MapContainer = ({parkNavigate}) => {
    const [region, setRegion] = useState(null);
    const [nearbyParks, setNearbyParks] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [key, setKey] = useState("");

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                console.log(errorMsg);
                return;
            }
            // let locationRes = await Location.getCurrentPositionAsync({}).then(
            //     (location) => {
            //         convertLocationToRegion(location);
            //         getNearbyPlaces(
            //             location.coords.latitude,
            //             location.coords.longitude
            //         ).then((res) => {
            //             updateRegionsTasks(res)
            //             handleNearbyParksUpdate(
            //                 res.map((park) => {
            //                     return createParkMarker(park);
            //                 })
            //             );
            //         });
            //     }
            // );
            await Location.watchPositionAsync({
                timeInterval: 2000,
                distanceInterval: 500,
            }, (location) => {
                convertLocationToRegion(location);
                getNearbyPlaces(
                    location.coords.latitude,
                    location.coords.longitude
                ).then((res) => {
                    updateRegionsTasks(res)
                    handleNearbyParksUpdate(
                        res.map((park) => {
                            return createParkMarker(park);
                        })
                    );
                });
            })
            let backgroundStatus = await Location.requestBackgroundPermissionsAsync()
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
