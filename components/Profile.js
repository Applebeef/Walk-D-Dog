import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import Title from "./Title";
import CustomButton from "./CustomButton";
import serverUtils from "./serverUtils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DogDisplay from "./DogDisplay";

function Profile({navigation}) {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dogs, setDogs] = useState([]);

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

    useEffect(() => {

        getUsername().then(username => {
            let response = getProfile(username);
            response.then(response => {
                setUsername(response.username);
                setFirstName(response.first_name);
                setLastName(response.last_name);
                setDogs(response.dogs.map((dog, index) => <DogDisplay key={index} dog_name={dog.name}
                                                                      dog_image={dog.filename} isOnline={"true"}/>));
            });
        })

    }, []);

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <Title/>
                <Text style={styles.text}>{username}</Text>
                <Text style={styles.text}>{firstName} {lastName}</Text>
                <View style={styles.dog_container}>{dogs}</View>
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
    dog_container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
    }
});


export default Profile;
