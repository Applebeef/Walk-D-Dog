import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import Title from "./Title";
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverUtils from "./serverUtils";
import FriendDisplay from "./FriendDisplay";

const getUsername = async () => {
    try {
        const username = await AsyncStorage.getItem('username')
        if (username !== null) {
            return username;
        }
    } catch (e) {
        console.log(e);
    }
};

function FriendsList({navigation}) {
    const [username, setUsername] = useState("");
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        getUsername().then((username) => {
            setUsername(username);
            fetch(`http://${serverUtils.constants.url}:${serverUtils.constants.port}/user/friends/${username}`)
                .then((res) => res.json())
                .then((data) => {
                    setFriends(data);
                })
        })
    }, []);


    return (
        <ScrollView>
            <View style={styles.container}>
                <Title/>
                <Text style={styles.title}>Friends:</Text>
                <View style={styles.list}>
                    {friends.map((friend, index) => <FriendDisplay key={index} username={friend}
                                                                   navigation={navigation}/>)}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fafafa",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 35,
    },
    list: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center",
        padding: 10,
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        padding: 10,
    }
});

export default FriendsList;
