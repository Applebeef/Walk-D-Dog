import {useEffect, useRef, useState} from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image, Platform,
} from "react-native";
// import MapView from 'expo'
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import serverUtils from "./serverUtils";

const PARK_ENTER_TASK = "ParkEnter"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

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

let regionsMap = {};

// TaskManager.defineTask(PARK_ENTER_TASK, ({data: {eventType, region}, error}) => {
//     if (error) {
//         // check `error.message` for more details.
//         return;
//     }
//     if (eventType === Location.GeofencingEventType.Enter && regionsMap[region.identifier] === Location.GeofencingRegionState.Outside) {
//         console.log("You've entered region:", region);
//         alert("You've entered region: " + region.identifier);
//         regionsMap[region.identifier] = Location.GeofencingRegionState.Inside;
//     } else if (eventType === Location.GeofencingEventType.Exit && regionsMap[region.identifier] === Location.GeofencingRegionState.Inside) {
//         console.log("You've left region:", region);
//         regionsMap[region.identifier] = Location.GeofencingRegionState.Outside;
//     }
// });

// async function updateRegionsTasks(parks, regionsMap) {
//     const RADIUS = 30; //radius in meters
//     let regions = parks.map((park) => {
//         return {
//             identifier: park.place_id,
//             latitude: park.geometry.location.lat,
//             longitude: park.geometry.location.lng,
//             radius: RADIUS,
//         };
//     });
//     await Location.startGeofencingAsync(PARK_ENTER_TASK, regions);
// }

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const {status} = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;

        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

async function sendPushNotification(expoPushToken) {
    const message = {
        to: expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: {someData: 'goes here'},
    };

    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
    });
}


const MapContainer = ({parkNavigate}) => {
        const [region, setRegion] = useState(null);
        const [nearbyParks, setNearbyParks] = useState([]);
        const [errorMsg, setErrorMsg] = useState(null);
        const [key, setKey] = useState("");
        const [token, setToken] = useState(null);
        const [notification, setNotification] = useState(false);
        const notificationListener = useRef();
        const responseListener = useRef();

        function areNearbyParksUpdated(res) {
            if (res.length !== nearbyParks.length) {
                setNearbyParks(res);
                return true;
            } else {
                for (let i = 0; i < res.length; i++) {
                    if (res[i].place_id !== nearbyParks[i].place_id) {
                        setNearbyParks(res);
                        return true;
                    }
                }
            }
            return false;
        }

        function updateLocationAndParks(location) {
            convertLocationToRegion(location);
            getNearbyPlaces(
                location.coords.latitude,
                location.coords.longitude
            ).then((res) => {
                // res.push({//Debug - add current location as a park - TODO delete
                //     place_id: "home",
                //     name: "Home",
                //     geometry: {
                //         location: {
                //             lat: location.coords.latitude,
                //             lng: location.coords.longitude,
                //         },
                //     },
                // })
                let is_updated = areNearbyParksUpdated(res);
                if (is_updated) {
                    for (let park of res) {
                        regionsMap[park.place_id] = Location.GeofencingRegionState.Outside
                    }
                    // updateRegionsTasks(res)
                }
            });
        }

        useEffect(() => {
                (async () => {
                    getKey().then((key) => {
                        Location.setGoogleApiKey(key);
                    });
                    let {status} = await Location.requestForegroundPermissionsAsync();
                    if (status !== "granted") {
                        setErrorMsg("Permission to access location was denied");
                        console.log(errorMsg);
                        return;
                    }
                    // let backgroundStatus = await Location.requestBackgroundPermissionsAsync()
                    updateLocationAndParks(await Location.getCurrentPositionAsync());
                    await Location.watchPositionAsync({
                        timeInterval: 30000,
                        distanceInterval: 500,
                    }, (location) => {
                        updateLocationAndParks(location);
                    })
                })();
            }, []
        )


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
                    {nearbyParks.map((park) => {
                        return createParkMarker(park);
                    })}
                </MapView>
            </View>
        );
    }
;

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
