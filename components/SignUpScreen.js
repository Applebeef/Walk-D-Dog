import React, {useState} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    useWindowDimensions,
    ScrollView,
} from "react-native";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import SocialSignInButtons from "./SocialSignInButtons";
import serverUtils from "./serverUtils";
import DogDisplay from "./DogDisplay";
import * as Notifications from "expo-notifications"
import * as Device from 'expo-device';

const uploadImage = async (image, filename, dog_id) => {
    let fd = new FormData();
    fd.append("image", {
        uri: image,
        name: filename,
        type: "image/jpg",
    });
    fd.append("dog_id", dog_id);
    const response = await fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/dog/uploadimage`,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            method: "POST",
            body: fd,
        }
    );
    return response.json();
};

async function checkUsername(username) {
    return fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/user/validate/${username}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        }
    ).then((response) => response.json());
}

async function sendRegisterRequest(
    email,
    password,
    username,
    first_name,
    last_name,
    dogs,
    push_token
) {
    return fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/user/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username,
                first_name: first_name,
                last_name: last_name,
                dogs: dogs.map((dog) => {
                    return {
                        name: dog.name,
                        age: dog.age,
                        gender: dog.gender,
                        breed: dog.breed,
                    };
                }),
                push_token: push_token
            }),
        }
    ).then((response) => response.json());
}

async function sendImagesRequest(dogs, ids) {
    await Promise.all(
        dogs.map((dog, index) => {
            return uploadImage(dog.image, get_filename(dog.image), ids[index]);
        })
    );
}

function get_filename(path) {
    return path.split("/").pop();
}

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

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

    return token;
}

const SignUpScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [dogs, setDogs] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    const onRegisterPressed = async () => {
        if (password !== passwordRepeat) {
            setErrorMessage("Passwords do not match");
            return;
        } else if (!validateEmail(email)) {
            setErrorMessage("Invalid email");
            return;
        } else if (!checkUsername(username)) {
            setErrorMessage("Username already exists");
            return;
        } else {
            setErrorMessage("");
        }
        registerForPushNotificationsAsync().then((push_token) => {
            console.log(push_token);
            sendRegisterRequest(
                email,
                password,
                username,
                first_name,
                last_name,
                dogs,
                push_token
            ).then((response) => {
                sendImagesRequest(dogs, response).then(
                    () => {
                        navigation.navigate("Login");
                    })
            })
        })
    };

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    };

    const onTerms0fUsePressed = () => {
        console.warn("onTerms0fUsePressed");
    };
    const onPrivacyPressed = () => {
        console.warn("onPrivacyPressed");
    };

    const onSignInPress = () => {
        navigation.navigate("Login");
    };

    const dogsAppend = (dog) => {
        setDogs([...dogs, dog]);
    };

    const onAddDogPressed = () => {
        navigation.navigate("DogSignup", {
            dogsAppend: (dog) => {
                dogsAppend(dog);
            },
        });
    };

    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Create an account</Text>
                <CustomInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                />

                <CustomInput placeholder="Email" value={email} setValue={setEmail}/>
                <CustomInput
                    placeholder="First name"
                    value={first_name}
                    setValue={setFirst_name}
                ></CustomInput>
                <CustomInput
                    placeholder="Last name"
                    value={last_name}
                    setValue={setLast_name}
                ></CustomInput>
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry
                />
                <CustomInput
                    placeholder="Repeat Password"
                    value={passwordRepeat}
                    setValue={setPasswordRepeat}
                    secureTextEntry
                />
                <Text>{errorMessage}</Text>
                <CustomButton
                    text="Add Dog +"
                    onPress={onAddDogPressed}
                    bgColor="#efefef"
                    fgColor="black"
                />
                <View style={styles.dog_container}>
                    {dogs.map((dog, index) => {
                        return (
                            <DogDisplay
                                key={index}
                                dog_name={dog.name}
                                dog_image={dog.image}
                                isOnline={"false"}
                            />
                        );
                    })}
                </View>
                <CustomButton
                    text="Register"
                    onPress={onRegisterPressed}
                    bgColor="#3871F3"
                />

                <Text style={styles.text}>
                    By registering, you confirm that you accept our{" "}
                    <Text style={styles.link}>Terms of Use</Text> and{" "}
                    <Text style={styles.link}>Privacy Policy</Text>
                </Text>

                <SocialSignInButtons></SocialSignInButtons>

                <CustomButton
                    text="Have an account?  Sign in "
                    onPress={onSignInPress}
                    fgColor="gray"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        padding: 50,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#051c60",
        margin: 10,
    },
    text: {
        color: "gray",
        marginVertical: 10,
    },
    link: {
        color: "#FDB075",
    },
    dog_container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
});
export default SignUpScreen;
