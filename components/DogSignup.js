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
const PROP = [
	{
		key: 'Male',
		text: 'Male',
	},
	{
		key: 'Female',
		text: 'Female',
	},
];

function onChanged(text){
  let newText = '';
  let numbers = '0123456789';

  for (var i=0; i < text.length; i++) {
      if(numbers.indexOf(text[i]) > -1 ) {
          newText = newText + text[i];
      }
      else {
          // your call back function
          alert("please enter numbers only");
      }
  }
  this.setState({ myNumber: newText });
}

const DogSignUp = () => {
  

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
            borderColor: "black",
            alignItems: 'flex-end'
          }}
        />
        <Text style={styles.text}>
        
          Dog Name:
          <CustomInput placeholder="Dog Name"/>

        </Text>
          
        <Text style={styles.text}>
          Dog Age:{' '} 
          <TextInput 
          keyboardType='numeric'
          onChangeText={(text)=> this.onChanged(text)}
          maxLength={10} 
/>
        </Text>
        <RadioButton PROP={PROP} />

      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    
    justifyContent: "center",
    padding: 50,
  },
  title: {
    alignSelf:"center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#051c60",
    margin: 10,
  },
  text: {
    fontSize:25,
    color:"black",
    alignSelf:"flex-end",
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
