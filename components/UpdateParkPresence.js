import {View, Text, StyleSheet, ScrollView, TextInput, Platform} from "react-native";
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

function UpdateParkPresence({route, navigation}) {
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [dogs, setDogs] = useState([]);
    const [username, setUsername] = useState('');
    const [dogsSelected, setDogsSelected] = useState([]);

    function addToList(dog_id) {
        setDogsSelected([...dogsSelected, dog_id]);
    }

    function removeFromList(dog_id) {
        setDogsSelected(dogsSelected.filter((dog) => dog !== dog_id));
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
        <ScrollView>
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
                        console.log(dogsSelected);
                    }} bgColor={"black"} fgColor={"white"}/>
                </View>
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
