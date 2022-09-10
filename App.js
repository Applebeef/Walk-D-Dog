import {StatusBar} from "expo-status-bar";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Profile from "./components/Profile";
import FriendsList from "./components/FriendsList";
import {useState, useEffect} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MapPage from "./components/MapPage";
import ParkPage from "./components/ParkPage";
import MapLogo from "./components/MapLogo";
import ProfileLogo from "./components/ProfileLogo";
import ChatLogo from "./components/ChatLogo";
import SignInScreen from "./components/SigninScreen";
import SignUpScreen from "./components/SignUpScreen";
import DogSignUp from "./components/DogSignup";
import ChangePassword from "./components/ChangePassword";
import FriendProfile from "./components/FriendProfile";
import InviteFriend from "./components/InviteFriend";
import UpdateParkPresence from "./components/UpdateParkPresence"

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
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <MapLogo/>
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
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <MapLogo/>
                        </View>
                    ),
                }}
            />
            <Stack.Screen name={"InviteFriend"} component={InviteFriend}
                          options={{
                              headerShown: false,
                              tabBarLabel: "",
                              tabBarIcon: ({color, size}) => (
                                  <View>
                                      <MapLogo/>
                                  </View>
                              ),
                          }}
            />
            <Stack.Screen name={"UpdatePresence"} component={UpdateParkPresence}
                          options={{
                              headerShown: false,
                              tabBarLabel: "",
                              tabBarIcon: ({color, size}) => (
                                  <View>
                                      <MapLogo/>
                                  </View>
                              ),
                          }}
            />
        </Stack.Navigator>
    );
}

function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <ProfileLogo/>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <ProfileLogo/>
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

function FriendsStack() {
    return (
        <Stack.Navigator initialRouteName="FriendsList">
            <Stack.Screen
                name="FriendsList"
                component={FriendsList}
                options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <ProfileLogo/>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="FriendProfile"
                component={FriendProfile}
                options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <ProfileLogo/>
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
                name="FriendsStack"
                component={FriendsStack}
                options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <ChatLogo/>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileStack"
                component={ProfileStack}
                options={{
                    headerShown: false,
                    tabBarLabel: "",
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <ProfileLogo/>
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
                    tabBarIcon: ({color, size}) => (
                        <View>
                            <MapLogo/>
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
