import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import CustomButton from "./CustomButton";

function FriendDisplay({username, navigation}) {
    function onPress() {
        navigation.navigate("FriendProfile", {username: username});
    }

    return (
        <View style={styles.container}>
            <CustomButton style={styles.button} text={username} onPress={onPress} fgColor={"black"}
                          bgColor={"#E2E2E2"}></CustomButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        borderColor: "black",
        // borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
});

export default FriendDisplay;
