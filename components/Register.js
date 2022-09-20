import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import Title from "./Title";
import serverUtils from "./serverUtils";

function Inputs({ setEmail, email, setPassword, password, setName, name }) {
  return (
    <View>
      <Text style={styles.title}>E-mail : </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <Text style={styles.title}>Password: </Text>
      <TextInput
        style={styles.input} //TODO hash?
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <Text style={styles.title}>Name: </Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setName(text)}
        value={name}
      />
    </View>
  );
}

function sendRegisterRequest(email, password, username) {
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
      }),
    }
  );
}

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
      <Title />
      <Inputs
        setEmail={setEmail}
        email={email}
        setPassword={setPassword}
        password={password}
        setName={setName}
        name={name}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          let response = sendRegisterRequest(email, password, name);
          console.log(response); //TODO test
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: 200,
    height: 40,
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#fafafa",
    borderRadius: 10,
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default Register;
