import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          //TODO send form to server
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#93C47D",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
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
    backgroundColor: "#7fc360",
    borderRadius: 10,
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default Register;
