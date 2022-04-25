import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Picker,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";

import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import SocialSignInButtons from "./SocialSignInButtons";
import serverUtils from "./serverUtils";
import RadioButton from "./RadioButton";

class Dog {
  constructor(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender ? gender : "";
  }
}

const PROP = [
  {
    key: "Male",
    text: "Male",
  },
  {
    key: "Female",
    text: "Female",
  },
];

const DogSignUp = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const onAddDogPressed = () => {
    route.params.dogsAppend(new Dog(name, age));//TODO: send gender to function
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <Text style={styles.title}>Add Your Dog </Text>
        <Image
          source={require("../assets/icons8-customer-96.png")}
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            borderWidth: 1,
            borderColor: "black",
            alignItems: "center",
            alignSelf: "center",
          }}
        />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Dog Name"
        />
        <TextInput
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          maxLength={2}
        />

        <RadioButton PROP={PROP} />
        <CustomButton
          text="Add Dog"
          onPress={() => onAddDogPressed()}
          bgColor="#3871F3"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    padding: 60,
  },
  title: {
    alignSelf: "center",
    paddingBottom: 25,
    fontSize: 25,
    fontWeight: "bold",
    color: "#051c60",
    margin: 10,
  },
  input: {
    paddingBottom: 15,
    fontSize: 25,
    color: "black",
    alignSelf: "flex-end",
    borderColor: "#e8e8e8",

    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  link: {
    color: "#FDB075",
  },
});
export default DogSignUp;
