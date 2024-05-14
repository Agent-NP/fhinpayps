import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Kanit_400Regular, Kanit_700Bold } from "@expo-google-fonts/kanit";
import { useFonts } from "expo-font";
import { useState, useEffect } from "react";

export default function Blank() {
  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold
  });
  const [showOverlay, setShowOverlay] = useState(true);

  function delay(time) {
    return new Promise(function(resolve) {
      setTimeout(resolve, time);
    });
  }
  async function Overlay() {
    if (showOverlay === false) {
      setShowOverlay(true);
    }
  }

  useEffect(() => {
    Overlay();
  }, []);

  useEffect(
    () => {
      const loadOverlay = async () => {
        if (showOverlay === true) {
          await delay(2000);
          setShowOverlay(false);
        }
      };
      loadOverlay();
    },
    [showOverlay]
  );

  if (!fontsLoaded) {
    return <SafeAreaView style={styles.container} />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        {showOverlay &&
          <View style={styles.overlayContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>}
        {(showOverlay === false) &&
          <View style={styles.Vcontainer}>
            <Image
              source={require("../../assets/icon.jpg")}
              resizeMode="contain"
              style={{
                width: "100%",
                position: "absolute",
                top: -100,
                left: 10
              }}
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
                <Text
                  style={[
                    styles.text,
                    { fontSize: 27, fontWeight: "bold", textAlign: "center" }
                  ]}
                >
                  Enter Security Pin:
                </Text>

                <TextInput
                  style={[
                    styles.textInput,
                    { marginVertical: 0, paddingTop: 5, textAlign: "center" }
                  ]}
                  autoFocus={true}
                  placeholder="0000"
                  maxLength={4}
                  inputMode="numeric"
                  placeholderTextColor={"#ccc"}
                />
              </View>
            </View>
            <TouchableOpacity style={styles.nextButton}>
              <Text style={styles.nextText}>ENTER</Text>
            </TouchableOpacity>
          </View>}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  Vcontainer: {
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
  nextButton: {
    position: "absolute",
    left: 10,
    bottom: 10,
    width: "100%",
    padding: 10,
    backgroundColor: "#007bff",
    color: "#fff",
    marginTop: 20,
    fontFamily: "Kanit_400Regular"
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)" // Transparent black background
  }
});
