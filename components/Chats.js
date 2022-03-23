import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Title from "./Title";

function Chats() {
  const [chatsList, setChatsList] = useState([]);
  const [chat, setChat] = useState("null");

  return (
    <View style={styles.container}>
      <Title />
      <Text>{chatsList}</Text>
      <Text>{chat}</Text>
    </View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#93C47D",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Chats;
