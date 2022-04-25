import React, { useState } from "react";
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

function sendRegisterRequest(email, password, username, first_name, last_name) {
  return fetch(
    `http://${serverUtils.constants.url}:${serverUtils.constants.port}/user/register`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
        first_name: first_name,
        last_name: last_name,
      }),
    }
  );
}

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterPressed = () => {
    if (password !== passwordRepeat) {
      setErrorMessage("Passwords do not match");
      return;
    } else if (!validateEmail(email)) {
      setErrorMessage("Invalid email");
      return;
    } else {
      setErrorMessage("");
    }
    let response = sendRegisterRequest(
      email,
      password,
      username,
      first_name,
      last_name
    );
    response.then((res) => {
      res.json().then((data) => {
        if (data) {
          navigation.navigate("Login");
        } else {
          setErrorMessage("Username already exists");
        }
      });
    });
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

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />

        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
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
});
export default SignUpScreen;
