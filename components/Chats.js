import { View, Text } from "react-native";
import { useEffect, useState } from "react";

function Chats() {
  const [chatsList,setChatsList] = useState([]);
  const [chat, setChat] = useState("null");

  return (
    <View>
      <Text>{chatsList}</Text>
      <Text>{chat}</Text>
    </View>
  );
}

export default Chats;
