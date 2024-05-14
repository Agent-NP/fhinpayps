import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Kanit_400Regular, Kanit_700Bold } from "@expo-google-fonts/kanit";
import { useFonts } from "expo-font";

export default function Home({ navigation }) {
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [showOverlay, setShowOverlay] = useState(true);

  function delay(time) {
    return new Promise(function(resolve) {
      setTimeout(resolve, time);
    });
  }
  async function Overlay() {
    await delay(2000);
    setShowOverlay(!showOverlay);
  }

  useEffect(() => {
    Overlay();
  }, []);

  const currencies = [
    { key: "USD", name: "US Dollar", symbol: "$" },
    { key: "EUR", name: "Euro", symbol: "€" },
    { key: "GBP", name: "British Pound", symbol: "£" },
    { key: "JPY", name: "Japanese Yen", symbol: "¥" },
    { key: "CNY", name: "Chinese Yuan Renminbi", symbol: "元" },
    { key: "INR", name: "Indian Rupee", symbol: "₹" },
    { key: "BRL", name: "Brazilian Real", symbol: "R$" },
    { key: "AUD", name: "Australian Dollar", symbol: "A$" },
    { key: "CAD", name: "Canadian Dollar", symbol: "CA$" },
    { key: "MXN", name: "Mexican Peso", symbol: "$" },
    { key: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { key: "RUB", name: "Russian Ruble", symbol: "₽" },
    { key: "SEK", name: "Swedish Krona", symbol: "kr" },
    { key: "NOK", name: "Norwegian Krone", symbol: "kr" },
    { key: "DKK", name: "Danish Krone", symbol: "kr" },
    { key: "THB", name: "Thai Baht", symbol: "฿" },
    { key: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
    { key: "KRW", name: "South Korean Won", symbol: "₩" },
    { key: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
    { key: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { key: "PHP", name: "Philippine Peso", symbol: "₱" },
    { key: "TRY", name: "Turkish Lira", symbol: "₺" },
    { key: "ZAR", name: "South African Rand", symbol: "R" },
    { key: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
    { key: "NGN", name: "Nigerian Naira", symbol: "₦" },
    { key: "EGP", name: "Egyptian Pound", symbol: "E£" },
    { key: "KES", name: "Kenyan Shilling", symbol: "KSh" },
    { key: "GHS", name: "Ghanaian Cedi", symbol: "GH₵" }
  ];

  const [symbol, setSymbol] = useState("");

  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold
  });

  const renderItem = ({ item }) =>
    <TouchableOpacity
      style={[
        styles.currencyItem,
        selectedCurrency === item.key && styles.currencyItemSelected
      ]}
      onPress={() => {
        setSymbol(item.symbol);
        setSelectedCurrency(item.key);
      }}
    >
      <Text style={styles.text}>
        {item.name}
      </Text>
    </TouchableOpacity>;

  const navigateToOffline = () => {
    if (selectedCurrency) {
      navigation.navigate("Offline", { symbol });
    } else {
      Alert("Please select a currency!");
    }
  };

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
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ ...styles.text, ...{ textAlign: "center" } }}>
              SELECT A CURRENCY
            </Text>
            <View style={styles.container}>
              <FlatList
                data={currencies}
                renderItem={renderItem}
                keyExtractor={item => item.key}
              />
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  if (symbol != undefined || symbol.length > 0) {
                    navigateToOffline();
                  }
                }}
              >
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 24,
    fontFamily: "Kanit_400Regular"
  },
  nextText: {
    fontSize: 24,
    color: "#ffffff",
    textAlign: "center",
    fontFamily: "Kanit_400Regular"
  },
  currencyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee"
  },
  currencyItemSelected: {
    backgroundColor: "#f0f0f0"
  },
  nextButton: {
    padding: 10,
    backgroundColor: "#007bff",
    color: "#fff",
    marginTop: 20
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)" // Transparent black background
  }
});
