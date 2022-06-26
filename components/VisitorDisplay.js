import {Text, View, StyleSheet, Alert, TouchableOpacity} from "react-native";
import DogDisplay from "./DogDisplay";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from "react";
import serverUtils from "./serverUtils";

async function sendFriendRequest(username, friend_name) {
    return fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/user/friends/${username}/${friend_name}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    )
}

async function getUsername() {
    try {
        const username = await AsyncStorage.getItem('username')
        if (username !== null) {
            return username;
        }
    } catch (e) {
        console.log(e);
    }
}

function friendRequestAlert(friend_name) {
    Alert.alert(`Send friend request to ${friend_name}?`, "", [
        {text: "No", style: "cancel"},
        {
            text: "Send", onPress: async () => {
                getUsername().then(username => {
                    sendFriendRequest(username, friend_name)
                })
            }
        }])
}

const VisitorDisplay = ({visitor_name, dogs}) => {
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        getUsername().then(username => {
            if (username !== visitor_name) {
                setDisabled(false);
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => friendRequestAlert(visitor_name)} disabled={disabled}>
                <Text style={styles.visitorDisplay}>{visitor_name}</Text>
                <View style={styles.dog_container}>
                    {dogs.map((dog, index) => {
                        // let path = `http://${serverUtils.constants.url}:${serverUtils.constants.port}/dogimg/${dog.filename}`;
                        return (
                            <DogDisplay key={index} dog_name={dog.name} dog_image={dog.filename} isOnline={"true"}/>
                        );
                    })}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,
    },
    dog_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    visitorDisplay: {
        fontSize: 25,
        textDecorationStyle: "solid",
    },
    dogDisplay: {
        fontSize: 20,
    },
});

export default VisitorDisplay;
