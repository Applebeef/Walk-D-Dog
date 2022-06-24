import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import CustomButton from "./CustomButton";
import CheckBox from "expo-checkbox";

function InviteFriendDisplay({username, addToList, removeFromList}) {
    const [checked, setChecked] = useState(false);

    return (
        <View>
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

export default InviteFriendDisplay;
