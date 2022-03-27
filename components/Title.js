import { StyleSheet, Text, View, Image } from "react-native";

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Image
        style={styles.logo}
        source={require("../assets/WalkDDog-Logo.png")}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    borderRadius: 80,
    borderWidth: 5,
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,

  },
});

export default Title;