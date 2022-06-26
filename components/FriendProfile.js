import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import Title from "./Title";
import CustomButton from "./CustomButton";
import serverUtils from "./serverUtils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DogDisplay from "./DogDisplay";
import {TouchableOpacity} from "react-native-web";

async function getProfile(username) {
    return fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/user/byusername/${username}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    ).then((response) => response.json())
}

function FriendProfile({route, navigation}) {
    const [username, setUsername] = useState('');
    const [dogs, setDogs] = useState([]);


    useEffect(() => {
        setUsername(route.params.username);
        getProfile(route.params.username).then(response => {
            setDogs(response.dogs.map((dog, index) => <DogDisplay key={index} dog_name={dog.name}
                                                                  dog_image={dog.filename} isOnline={"true"}/>));
        })
    });

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title/>
                <Text>{username}</Text>
                <View style={styles.dog_container}>{dogs}</View>
                <CustomButton text="Back" bgColor={"gray"} fgColor={"black"} onPress={() => navigation.goBack()}/>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-around",
    },
    dog_container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",
    },
});

export default FriendProfile;
