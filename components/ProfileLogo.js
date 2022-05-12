import { StyleSheet, Text, View, Image } from "react-native";

const ProfileLogo = () => {
  return (
    <View>
      <Image
        style={styles.logo}
        source={require("../assets/icons8-customer-96.png")}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
 
  logo: {
    width: 64 ,
    height: 64,

  },
});

export default ProfileLogo;