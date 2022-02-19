import { View, Text } from "react-native";
import { useEffect, useState } from "react";

function Profile() {
  const [name, setName] = useState("null");
  const [dogs, setDogs] = useState("null");

  return (
    <View>
      <Text>{name}</Text>
      <Text>Dogs:</Text>
      <Text>{dogs}</Text>
    </View>
  );
}

export default Profile;
