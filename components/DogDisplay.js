import {Text, View, Image, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import serverUtils from "./serverUtils";
import CheckBox from "expo-checkbox";

const DogDisplay = ({dog_name, dog_image, isOnline, dog_id, addToList, removeFromList}) => {
    const [checked, setChecked] = useState(false);

    let path
    if (isOnline === "true") {
        if (dog_image === "default.jpg") {
            path = `http://${serverUtils.constants.url}:${serverUtils.constants.port}/${dog_image}`;
        } else {
            path = `http://${serverUtils.constants.url}:${serverUtils.constants.port}/dogimg/${dog_image}`;
        }
    } else {
        path = dog_image;
    }
    return (
        <View style={styles.dogDisplay}>
            <Text style={styles.dogName}>{dog_name}</Text>
            <Image
                source={{uri: path}}
                style={{width: 80, height: 60, borderRadius: 20}}
            />
            {addToList === undefined && removeFromList === undefined ? null :
                <CheckBox
                style={styles.checkbox}
                value={checked}
                onValueChange={() => {
                    if (checked) {
                        removeFromList(dog_id);
                    } else {
                        addToList(dog_id);
                    }
                    setChecked(!checked);
                }}/>}
        </View>
    );
};

const styles = StyleSheet.create({
    dogDisplay: {
        textAlign: "center",
        margin: 10,
        borderWidth: 1,
        borderRadius: 20,
    },
    dogName: {
        fontSize: 15,
        fontWeight: "bold",
        textAlign: "center",
        margin: 3,
    },
    checkbox: {
        alignSelf: "center",
        margin: 5,
    }
});

export default DogDisplay;
