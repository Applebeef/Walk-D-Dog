import { Text, View } from "react-native";
import React from "react";

const DogDisplay = ({ dog_name }) => {
    return (
        <View>
            <Text style={styles.dogDisplay}>{dog_name}</Text>
        </View>
    );
};

export default DogDisplay;