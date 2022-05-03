import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Title from "./Title";
import DogDisplay from "./DogDisplay";
import CustomButton from "./CustomButton";
import serverUtils from "./serverUtils";

function Profile({ username }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch(
      `http://${serverUtils.constants.url}:${serverUtils.constants.port}/user/byusername/${username}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setFirstName(responseJson.firstName);
        setLastName(responseJson.lastName);
        setEmail(responseJson.email);
        // setDogs(responseJson.dogs.map((dog) => <DogDisplay dog_name={dog} />));
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Title />
        <Text>{username}</Text>
        <Text>{firstName} {lastName}</Text>
        <Text>{email}</Text>
        <CustomButton  text={"Change password"} />
        <View style={styles.dog_container}>{dogs}</View>
      </View>
    </ScrollView>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    alignItems: "center",
    justifyContent: "space-around",
  },
  dog_container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
  },
});



export default Profile;
