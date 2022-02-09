import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const ButtonsContainer = () => {
  return (
    <View style={styles.container}>
      <MenuButton text="My profile" />
      <MenuButton text="Chats" />
      <MenuButton text="Plan trip" />
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
    <LinearGradient colors={['#93bc81','#dcecd5']} style={styles.menuButton}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.menuButtonText}>{props.text}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 3,
    borderRadius: 7,
    bottom: 0,
    backgroundColor: "#7fc360",
    borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  menuButton: {
    margin: 10,
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 15,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  menuButtonText: {
    fontSize: 18,
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default ButtonsContainer;
