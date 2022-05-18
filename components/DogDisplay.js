import {Text, View, Image, StyleSheet} from "react-native";
import React from "react";
import serverUtils from "./serverUtils";

const DogDisplay = ({dog_name, dog_image}) => {
    let path
    if (dog_image === "default.jpg") {
        path = `http://${serverUtils.constants.url}:${serverUtils.constants.port}/${dog_image}`;
    } else {
        path = `http://${serverUtils.constants.url}:${serverUtils.constants.port}/dogimg/${dog_image}`;
    }
    return (
        <View style={styles.dogDisplay}>
            <Text style={styles.dogDisplay}>{dog_name}</Text>
            <Image
                source={{uri: path}}
                style={{width: 80, height: 60, borderRadius: 20}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dogDisplay: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
        borderWidth: 1,
        borderRadius: 20,
    },
});

export default DogDisplay;
