import {Text, View, StyleSheet} from "react-native";
import DogDisplay from "./DogDisplay";

const VisitorDisplay = ({visitor_name, dogs}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.visitorDisplay}>{visitor_name}</Text>
            <View style={styles.dog_container}>
                {dogs.map((dog, index) => {
                    // let path = `http://${serverUtils.constants.url}:${serverUtils.constants.port}/dogimg/${dog.filename}`;
                    return (
                        <DogDisplay key={index} dog_name={dog.name} dog_image={dog.filename}/>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,
    },
    dog_container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        width: "90%",
    },
    visitorDisplay: {
        fontSize: 25,
        textDecorationStyle: "solid",
    },
    dogDisplay: {
        fontSize: 20,
    },
});

export default VisitorDisplay;
