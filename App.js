import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Profile from "./components/Profile";
import Chats from "./components/Chats";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapPage from "./components/MapPage";
import ParkPage from "./components/ParkPage";
import MapLogo from "./components/MapLogo";
import ProfileLogo from "./components/ProfileLogo";
import ChatLogo from "./components/ChatLogo";
import SignInScreen from "./components/SigninScreen";
import SignUpScreen from "./components/SignUpScreen";
import DogSignUp from "./components/DogSignup";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MapStack() {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen
        name="MapPage"
        component={MapPage}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View>
              <MapLogo />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ParkPage"
        component={ParkPage}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View>
              <MapLogo />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function LoggedInTabs() {
  return (
    <Tab.Navigator style={styles.container}>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View>
              <ProfileLogo />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View>
              <ChatLogo />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon: ({ color, size }) => (
            <View>
              <MapLogo />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const page = loggedIn ? "Home" : "Login";

  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={SignInScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DogSignup"
          component={DogSignUp}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={LoggedInTabs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    position: "absolute",
    top: 20,
  },
  map: {},
  buttonsContainer: {
    position: "absolute",
    bottom: 10,
  },
});
