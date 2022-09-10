import {View, Text, StyleSheet, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import Title from "./Title";
import serverUtils from "./serverUtils";
import CustomButton from "./CustomButton";
import VisitorDisplay from "./VisitorDisplay";

async function fetchPark(id) {
    let response = fetch(
        `http://${serverUtils.constants.url}:${serverUtils.constants.port}/park/get/${id}`,
        {
            method: "GET",
        }
    ).then((response) => response.json());
    return response;
}

const ParkPage = ({route, navigation}) => {
    const [parkVisitors, setParkVisitors] = useState([]);

    useEffect(() => {
        fetchPark(route.params.id).then((visitors) => {
            let visitorDisplayArray = [];
            for (let name in visitors) {
                let visitorDisplay = (
                    <VisitorDisplay
                        key={name}
                        visitor_name={name}
                        dogs={visitors[name]}
                    />
                );
                visitorDisplayArray.push(visitorDisplay);
            }
            if (visitorDisplayArray.length === 0) {
                visitorDisplayArray.push(
                    <Text key="noVisitors">Looks like the park is empty</Text>
                );
            }
            setParkVisitors(visitorDisplayArray);
        });
    }, []);

    return (
        <ScrollView>
            <View style={styles.container}>
                <Title/>
                <Text style={styles.title}>{route.params.name}</Text>
                <Text>In the park:</Text>
                {parkVisitors}
                <CustomButton
                    text={"Invite a friend to the park"}
                    bgColor="#000000"
                    onPress={() => navigation.navigate("InviteFriend", {
                        park_id: route.params.id,
                        park_name: route.params.name
                    })}

                />
                <CustomButton
                    onPress={() => navigation.goBack()}
                    text={"Go back"}
                    bgColor="#000000"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },
    visitorDisplay: {
        fontSize: 20,
    },
    title: {
        fontSize: 30,
    },
});

export default ParkPage;
