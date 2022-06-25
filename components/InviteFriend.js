import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import Title from "./Title";
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverUtils from "./serverUtils";
import FriendDisplay from "./FriendDisplay";
import InviteFriendDisplay from "./InviteFriendDisplay";
import CustomButton from "./CustomButton";
import CheckBox from "expo-checkbox"

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

async function getFriends(username) {
    return fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/user/friends/${username}`
    ).then((response) => response.json())
}

async function sendInvites(friendsToInvite) {
    return fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/user/parkinvite`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                friends: friendsToInvite
            })
        }
    )
}


function InviteFriend({route, navigation}) {
    const [friends, setFriends] = useState([]);
    const [friendsToInvite, setFriendsToInvite] = useState([]);

    function addToList(friend) {
        if (!friendsToInvite.includes(friend)) {
            setFriendsToInvite([...friendsToInvite, friend]);
        }
    }

    function removeFromList(friend) {
        setFriendsToInvite(friendsToInvite.filter(f => f !== friend));
    }


    useEffect(() => {
        getUsername().then((username) => {
                getFriends(username).then((friends) => {
                        setFriends(friends);
                    }
                )
            }
        )
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title/>
                <Text>Friends:</Text>
                <View style={styles.list}>
                    {friends.map((friend, index) => <InviteFriendDisplay key={index} username={friend}
                                                                         addToList={addToList}
                                                                         removeFromList={removeFromList}/>)}

                </View>
                <CustomButton text={"Go Back"} onPress={() => navigation.goBack()} bgColor={"black"} fgColor={"white"}/>
                <CustomButton text={"Invite Friends"} onPress={() => {
                    sendInvites(friendsToInvite).then(() => {
                        navigation.goBack()
                    })
                }} bgColor={"black"} fgColor={"white"}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#93C47D",
        alignItems: "center",
        justifyContent: "space-around",
    },
    list: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center",
    },
})

export default InviteFriend;
