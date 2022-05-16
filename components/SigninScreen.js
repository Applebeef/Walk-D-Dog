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
import serverUtils from "./serverUtils";
import AsyncStorage from '@react-native-async-storage/async-storage';

function sendLoginRequest(username, password) {
    return fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/user/login`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }
    );
}

const storeUsername = async (username) => {
    try {
        await AsyncStorage.setItem('username', username);
    } catch (e) {
        console.log(e);
    }
}

const SignInScreen = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const {height} = useWindowDimensions();
    const onSignInPressed = () => {
        let response = sendLoginRequest(username, password);
        response.then((res) => {
            res.json().then((data) => {
                if (data) {
                    storeUsername(username)
                    navigation.navigate("Home")
                } else {
                    alert("Invalid username or password");
                }
            });
        });
    };

    const onForgotPasswordPressed = () => {
        console.warn("onForgotPasswordPressed");
    };

    const onSignInFacebook = () => {
        console.warn("onSignInFacebook");
    };
    const onSignInGoogle = () => {
        console.warn("onSignInGoogle");
    };
    const onSignInApple = () => {
        console.warn("onSignInApple");
    };
    const onSignUpPress = () => {
        navigation.navigate("SignUp");
    };

    return (
        <ScrollView>
            <View style={styles.root}>
                <Image
                    source={require("../assets/WalkDDog-Logo.png")}
                    style={[styles.logo, {height: height * 0.3}]}
                    resizeMode="contain"
                />
                <CustomInput
                    placeholder="User name"
                    value={username}
                    setValue={setUsername}
                />
                <CustomInput
                    placeholder="Password"
                    value={password}
                    setValue={setPassword}
                    secureTextEntry={true}
                />
                <CustomButton
                    text="Sign In"
                    onPress={onSignInPressed}
                    bgColor="#3871F3"
                />
                <CustomButton
                    text="Forgot password?"
                    onPress={onForgotPasswordPressed}
                    type="TERTIARY"
                    fgColor="gray"
                    bgColor="#fafafa"
                />
                <CustomButton
                    text="Sign In with Facebook"
                    onPress={onSignInFacebook}
                    bgColor="#E7EAF4"
                    fgColor="#4765A9"
                />
                <CustomButton
                    text="Sign In with Google"
                    onPress={onSignInGoogle}
                    bgColor="#FAE9EA"
                    fgColor="#DD4D44"
                />
                <CustomButton
                    text="Sign In with Apple"
                    onPress={onSignInApple}
                    bgColor="#e3e3e3"
                    fgColor="#363636"
                />
                <CustomButton
                    text="Don't have an account? Create one"
                    onPress={onSignUpPress}
                    type="TERTIARY"
                    fgColor="#e4e4e4"
                    bgColor="#afafaf"
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
    logo: {
        width: "70%",
        maxWidth: 300,
        maxHeight: 100,
        padding: 80,
    },
});
export default SignInScreen;
