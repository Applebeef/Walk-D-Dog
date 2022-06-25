import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import CustomButton from "./CustomButton";
import CheckBox from "expo-checkbox";

function InviteFriendDisplay({username, addToList, removeFromList}) {
    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.container}>
            <Text>
                {username}
            </Text>
            <CheckBox
                value={checked}
                onValueChange={() => {
                    if (checked) {
                        removeFromList(username);
                    } else {
                        addToList(username);
                    }
                    setChecked(!checked);
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
        borderColor: "black",
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
});


export default InviteFriendDisplay;
