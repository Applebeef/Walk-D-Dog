import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false);
            // setLoggedIn(true);
            navigation.navigate("Home");
          }, 2000);
        }}
      >
        {isLoading ? (
          <Text style={styles.buttonText}>Loading...</Text>
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Register");
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

export default Login;
