
import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions,ScrollView} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import SocialSignInButtons from './SocialSignInButtons';

const SignUpScreen = () => {
  const [username, setUsername] =useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
                               
                                  
 
const onRegisterPressed = () => {
    console.warn("OnRrg");
} ;   
const onForgotPasswordPressed =() => {
    console.warn('onForgotPasswordPressed');
   }; 

   const onTerms0fUsePressed  =()=> { 
    console.warn('onTerms0fUsePressed');
  };
  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };
                          

  const onSignInPress = () =>{
    console.warn('onSignInPress');
  };


return (
    <ScrollView>
    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>
      <CustomInput
 placeholder="Username"
  value={username}
  setValue={setUsername}/>

<CustomInput placeholder="Email" value={email} setValue={setEmail}/>

<CustomInput
 placeholder="Password"
  value={password}
  setValue={setPassword}
  secureTextEntry
  />
<CustomInput
 placeholder="Repeat Password"
  value={passwordRepeat}
  setValue={setPasswordRepeat}
 secureTextEntry
/>
<CustomButton text="Register" onPress={onRegisterPressed} bgColor= "#3871F3" />

<Text style={styles.text}>
  By registering, you confirm that you accept our{' '}
  <Text style={styles.link}>Terms of Use</Text> and {' '}
  <Text style={styles.link}>Privacy Policy</Text>
</Text>

<SocialSignInButtons></SocialSignInButtons>


 <CustomButton
  text="Have an account?  Sign in "
  onPress={onSignInPress}
  
  fgColor='gray'
  
  />
  </View>
  </ScrollView>
    );
};

const styles=StyleSheet.create({  
root: {
    flex:1,
alignItems: 'center',
justifyContent:'space-around',
padding: 50
}, 
title: {
  fontSize:25,
  fontWeight:'bold',
  color:'#051c60',
  margin:10,
},
text: {
  color: 'gray',
  marginVertical: 10,
},
link: {
  color: '#FDB075',
},
});
export default SignUpScreen;