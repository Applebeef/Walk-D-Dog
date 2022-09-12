import {View, Text, StyleSheet, ScrollView, TextInput, Platform, Alert} from "react-native";
import {useEffect, useState} from "react";
import Title from "./Title";
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverUtils from "./serverUtils";
import CustomButton from "./CustomButton";
import DogDisplay from "./DogDisplay";

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

async function sendUpdate(park_id, username, dogsSelected, hours, minutes) {
    return fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/park/add`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                park_id: park_id,
                visitor_name: username,
                dog_id: dogsSelected,
                hours: hours === "" ? 0 : hours,
                minutes: minutes === "" ? 0 : minutes
            }),
        }
    ).then((response) => response.json());
}

async function checkIfUserInAPark(username) {
    return fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/park/check/${username}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    ).then((response) => response.json())
}

async function removeLastVisit(username) {
    return fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/park/remove/${username}`,
        {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    ).then((response) => response.json())
}

function UpdateParkPresence({route, navigation}) {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [username, setUsername] = useState('');
    const [dogs, setDogs] = useState([]);
    const [dogsSelected, setDogsSelected] = useState(new Set());

    function addToList(dog_id) {
        dogsSelected.add(dog_id);
    }

    function removeFromList(dog_id) {
        dogsSelected.delete(dog_id);
    }

    useEffect(() => {
        getUsername().then(username => {
            let response = getProfile(username);
            response.then(response => {
                setUsername(response.username);
                setDogs(response.dogs.map((dog, index) => <DogDisplay key={index} dog_name={dog.name}
                                                                      dog_image={dog.filename} isOnline={"true"}
                                                                      dog_id={dog.id}
                                                                      addToList={addToList}
                                                                      removeFromList={removeFromList}/>));
                checkIfUserInAPark(username).then(response => {
                    if (response) {
                        Alert.alert("You are already in a park! do you want to remove your last visit?", "", [
                            {text: "No", style: "cancel", onPress: () => navigation.goBack()},
                            {
                                text: "Yes", onPress: async () => {
                                    await removeLastVisit(username);
                                }
                            }])
                    }

                })
            });
        })
    }, []);

    const onChangeHours = (hours) => {
        const numberHours = parseInt(hours);
        if (numberHours > 24) {
            setHours("24");
        } else if (numberHours < 0) {
            setHours("0");
        } else {
            setHours(hours);
        }
    }

    const onChangeMinutes = (minutes) => {
        const numberMinutes = parseInt(minutes);
        if (numberMinutes > 59) {
            setMinutes("59");
        } else if (numberMinutes < 0) {
            setMinutes("0");
        } else {
            setMinutes(minutes);
        }
    }

    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <Title/>
                <Text style={styles.helloText}>
                    Hello {username}, how long do you plan to stay in the park?
                </Text>
                <View style={styles.clockDisplay}>
                    <TextInput
                        keyboardType='numeric'
                        placeholder="Hours"
                        onChangeText={onChangeHours}
                        style={styles.clockText}
                        value={hours}
                    >
                    </TextInput>
                    <Text style={styles.clockText}>:</Text>
                    <TextInput
                        keyboardType='numeric'
                        placeholder="Minutes"
                        onChangeText={onChangeMinutes}
                        style={styles.clockText}
                        value={minutes}
                    >
                    </TextInput>
                </View>
                <View style={styles.dog_container}>{dogs}</View>
                <View style={styles.buttons}>
                    <CustomButton text={"Go Back"} onPress={() => navigation.goBack()} bgColor={"black"}
                                  fgColor={"white"}/>
                    <CustomButton text={"Update"} onPress={() => {
                        if (hours === "" && minutes === "") {
                            alert("Please enter a valid time");
                        } else if (dogsSelected.size === 0) {
                            alert("Please select at least one dog");
                        } else {
                            sendUpdate(route.params.park_id, username, Array.from(dogsSelected), hours, minutes).then(
                                () => {
                                    navigation.goBack();
                                });
                        }
                    }} bgColor={"black"} fgColor={"white"}/>
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
        paddingTop: Platform.OS === "android" ? 40 : 0,
    },
    clockDisplay: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: "85%",
    },
    clockText: {
        fontSize: 30,
        color: "black",
        backgroundColor: "white",
        width: "40%",
        textAlign: "center",
        direction: "ltr",
        borderRadius: 10,
    },
    buttons: {
        justifyContent: "space-around",
        alignItems: "center",
        width: "85%",
    },
    helloText: {
        fontSize: 20,
        color: "black",
        textAlign: "center",
        width: "85%",
    },
    dog_container: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",
    },
})

export default UpdateParkPresence;
