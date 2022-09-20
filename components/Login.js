import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useState, useEffect } from "react";
import Title from "./Title";

function Buttons({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setIsLoading(true);
          setTimeout(() => {
            setIsLoading(false); // setLoggedIn(true);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "Home",
                },
              ],
            });
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
}

function Inputs({ setEmail, email, setPassword, password }) {
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
    </View>
  );
}

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <Title />
      <Text style={styles.welcometext}>Welcome</Text>
      <Inputs
        setEmail={setEmail}
        email={email}
        setPassword={setPassword}
        password={password}
      />
      <Buttons navigation={navigation} />
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
    backgroundColor: "#fafafa",
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
    marginBottom: 15,
    borderColor: "black",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    fontStyle: "normal",
  },
  welcometext:{

    fontSize: 50,
    textAlign: "center",
    fontStyle:"normal",
    fontFamily: 'sans-serif-thin',
    fontWeight: 'normal',
  }
});

export default Login;
