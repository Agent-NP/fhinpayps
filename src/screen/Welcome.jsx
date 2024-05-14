import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Kanit_400Regular, Kanit_700Bold } from "@expo-google-fonts/kanit";
import { useFonts } from "expo-font";

export default function Welcome({ navigation }) {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold
  });

  if (!fontsLoaded) {
    return <SafeAreaView style={styles.container} />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/icon.jpg")}
            resizeMode="contain"
            style={{ width: "100%", position: "absolute", top: -100, left: 10 }}
          />
          <View
            style={{
              position: "absolute",
              top: "40%",
              left: 10,
              justifyContent: "center",
              width: "100%"
            }}
          >
            <View style={{ marginTop: 10 }}>
              <TouchableOpacity
                style={styles.nextButton1}
                onPress={() => navigation.navigate("Blank")}
              >
                <Text style={styles.nextText}>TRANSFER</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextButton2}
              onPress={() => navigation.navigate("Home")}>
                <Text style={styles.nextText}>WITHDRAW</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
    padding: 10
  },
  text: {
    fontSize: 24,
    fontFamily: "Kanit_400Regular"
  },
  textInput: {
    flexGrow: 1,
    fontSize: 24,
    borderBottomWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    fontFamily: "Kanit_400Regular"
  },
  nextText: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "Kanit_400Regular"
  },
  nextButton1: {
    position: "absolute",
    left: 5,
    bottom: 10,
    width: "100%",
    padding: 10,
    backgroundColor: "#007bff",
    color: "#fff",
    marginTop: 20,
    fontFamily: "Kanit_400Regular"
  },
  nextButton2: {
    position: "absolute",
    left: 5,
    width: "100%",
    padding: 10,
    backgroundColor: "#007bff",
    color: "#fff",
    marginTop: 20,
    fontFamily: "Kanit_400Regular"
  }
});
