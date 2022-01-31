import { StyleSheet, Text, View, Image } from "react-native";

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Walk-D-Dog</Text>
      <Image
        style={styles.logo}
        source={require("../assets/WalkDDog-PlaceHolderLogo.png")}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "brown",
    borderRadius: 60,
    borderWidth: 2,
    padding: 15,
    alignItems: "center",
  },
  title: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 30,
  },
  logo: {
    width: 60,
    height: 60,
  },
});

export default Title;
