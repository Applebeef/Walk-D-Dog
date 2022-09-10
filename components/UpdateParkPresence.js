import {View, Text, StyleSheet, ScrollView, TextInput, Platform} from "react-native";
import {useEffect, useState} from "react";
import Title from "./Title";
import AsyncStorage from '@react-native-async-storage/async-storage';
import serverUtils from "./serverUtils";
import CustomButton from "./CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";

async function getUsername() {
    try {
        const username = await AsyncStorage.getItem('username')
        if (username !== null) {
            return username;
        }
    } catch (e) {
        console.log(e);
    }
}

function UpdateParkPresence({route, navigation}) {
    const [time, setTime] = useState(0);
    const [username, setUsername] = useState('');
    const [mode, setMode] = useState('time');
    const [show, setShow] = useState(false);


    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(false);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showTimepicker = () => {
        showMode('time');
    };

    useEffect(() => {
        getUsername().then((username) => {
                setUsername(username);
            }
        )
    }, []);

    return (
        <View style={styles.container}>
            <Title/>
            <CustomButton onPress={showTimepicker} title="Show time picker!"/>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={time}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}
            <CustomButton text={"Go Back"} onPress={() => navigation.goBack()} bgColor={"black"} fgColor={"white"}/>
            <CustomButton text={"I'm here"} onPress={() => {

            }} bgColor={"black"} fgColor={"white"}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#93C47D",
        alignItems: "center",
        justifyContent: "space-around",
    },
})

export default UpdateParkPresence;
