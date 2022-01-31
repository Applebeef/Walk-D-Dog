import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ButtonsContainer = () => {
  return (
    <View style={styles.container}>
      <MenuButton text="1" />
      <MenuButton text="2" />
      <MenuButton text="3" />
    </View>
  );
};

function printText(text) {
  console.log(text);
  alert(text);
}

const MenuButton = (props) => {
  const handlePress = () => {
    printText(props.text);
  };

  return (
    <View style={styles.menuButton}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.menuButtonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 3,
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  menuButton: {
    margin: 20,
    borderColor: "black",
    backgroundColor: "#23C57D",
    borderWidth: 2,
    borderRadius: 60,
    height: 70,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  menuButtonText: {
    fontSize: 50,
  },
});

export default ButtonsContainer;
