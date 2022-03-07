import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapContainer from "./components/Map";
import Profile from "./components/Profile";
import Title from "./components/Title";
import Chats from "./components/Chats";
import ButtonsContainer from "./components/Buttons";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let pages = [<MapContainer />, <Profile />, <Chats />];

  const changePage = (index) => {
    setPage(pages[index]);
  };

  pages.push(
    <Login changePageFunction={changePage} setLoggedIn={setIsLoggedIn} />
  );

  const [page, setPage] = useState(isLoggedIn ? pages[0] : pages[3]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title />
      </View>
      <View style={styles.map}>{page}</View>
      <View style={styles.buttonsContainer}>
        <ButtonsContainer onPressFunction={changePage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#93C47D",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    top: 40,
  },
  map: {},
  buttonsContainer: {
    position: "absolute",
    bottom: 10,
  },
});
