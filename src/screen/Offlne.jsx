import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  useFonts,
  Kanit_400Regular,
  Kanit_700Bold
} from "@expo-google-fonts/kanit";
import { AntDesign } from "@expo/vector-icons";
import * as Print from "expo-print";

export default function Offline({ navigation, route }) {
  const { symbol } = route.params;
  const intervalRef = useRef(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [showEnterAmount, setShowEnterAmount] = useState(false);
  const [showConfirmEnterAmount, setShowConfirmEnterAmount] = useState(false);
  const [showEnterCardNumber, setShowEnterCardNumber] = useState(false);
  const [showPin, setShowPin] = useState(false);
  const [showLastScreen, setShowLastScreen] = useState(false);
  const [enteredAmount, setEnteredAmount] = useState("");
  const [expiry, setExpiry] = useState("");
  const [amount, setAmount] = useState("0");

  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [pin, setPin] = useState("");
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

  const handlePrint = async () => {
    function generateReceiptNumbers(numReceipts = 12) {
      const receiptNumbers = new Set();
      while (receiptNumbers.size < numReceipts) {
        const randomSuffix = Math.floor(Math.random() * 1000000).toString();
        receiptNumbers.add(parseInt(`${randomSuffix.padStart(6, "0")}`));
      }
      return Array.from(receiptNumbers);
    }
    // Generate 12 receipt numbers
    const generatedNumbers = generateReceiptNumbers();
    const receiptNo = "000000" + generatedNumbers[0];
    const transactionId = generatedNumbers[1] + "" + generatedNumbers[2];
    function maskFirstNumbers(inputString) {
      if (inputString.length < 12) {
        return inputString;
      }
      // Convert the string to an array of characters
      const characters = inputString.split("");
      // Replace middle 4 characters with asterisks
      for (let i = 0; i < 12; i++) {
        characters[i] = "*";
      }
      // Join the array back into a string and return it
      return characters.join("");
    }
    const maskedNumber = maskFirstNumbers(cardNumber);

    const htmlContent = `<body>
    <style>
    *{
      margin: 0px;
      padding: 0px;
      box-sixing: border-box;
      font-size: 8px;
    }
        body {
            position: relative;
            font-size: x-small;
            display: flex;
            justify-content: left;
            align-items: start;
        }

        #box3 {
            width: 140px;
            padding: 2px 2px;
            background-color: white;
            border-radius: 20px;
        }

        #header {
            font-size: 2rem;
            text-align: center;
            width: 100%;
        }

        #header2 {
            font-size: 0.5rem;
            text-align: center;
            width: 100%;
        }

        #text-body {
            display: flex;
            width: 100%;
            margin: 10px 0px;
        }

        #headerContainer {
            margin: 5px 0px;
        }
    </style>
    <div id="box3">
        <div id="headerContainer">
            <span style="display: inline-block; margin-top: 5px; font-weight: bold;" id="header">FHINPAY</span>
            <span style="display: inline-block; margin-top: 5px; font-weight: bold;" id="header2">OFFLINE CARD
                PAYMENT</span>
            <style>
            table {
              border-collapse: collapse;
              width: 100%;
              display: flex;
              flex-direction: column;
          }

          tr {
              display: flex;
              justify-content: space-between;
              margin: 5px 0px;
          }

          th,
          td {
              padding: 1px 4px;
              text-align: left;
          }

          th:first-child,
          td:first-child {
              font-weight: bold;
              text-align: left;
          }

          th:last-child,
          td:last-child {
              text-align: right;
          }
            </style>
        </div>
        <span id="text-body">
            <table>
                <tr>
                    <td>RECIEPT NO:</td>
                    <td id="receiptNo">${receiptNo}</td>
                </tr>
                <tr>
                    <td>MERCHANT</td>
                    <td id="">2170XYZV</td>
                </tr>
                <tr>
                    <td>DATE & TIME:</td>
                    <td id="">${date} ${time}</td>
                </tr>
                <tr>
                    <td>CARD NO: </td>
                    <td id="cardNumber">${maskedNumber}</td>
                </tr>
                <tr>
                    <td>CARD TYPE: </td>
                    <td>VISA</td>
                </tr>
                <tr>
                    <td>CARD EXP: </td>
                    <td id="paidOnDate">${exp}</td>
                </tr>
                <tr>
                    <td>TRANSACTION ID: </td>
                    <td id="transactionId">${transactionId}</td>
                </tr>
                <tr style="justify-content: center;">
                    <td>********************</td>
                </tr>
                <tr style="justify-content: center; ">
                    <td style="font-weight: bold; font-size: larger;">${symbol} ${enteredAmount}.00 </td>
                </tr>
                <tr style="justify-content: center;">
                    <td>********************</td>
                </tr>
                <tr style="justify-content: center;">
                    <td>DECLINED</td>
                </tr>
                <tr>
                    <td>RESPONSE CODE: </td>
                    <td>00</td>
                </tr>
                <tr>
                    <td>MESSAGE: </td>
                    <td style="font-weight: bold; font-size: 9px;">Insufficent Balance</td>
                </tr>
                <tr style="display: inline-flex; margin: 8px 0px;">
                    <td style="text-align: center; opacity: 0.8; filter: blur(0.2px);">I agree to pay
                        above total amount according to card issuer agreement, merchant agreement if credit voucher</td>
                </tr>
                <tr style="display: inline-flex; margin: 5px 0px; justify-content: center; width: 100%;">
                    <td style="text-align: center; opacity: 0.8; filter: blur(0.2px);">Merchant Copy</td>
                </tr>
            </table>
        </span>
    </div>
</body>`;
    try {
      await Print.printAsync({
        html: htmlContent
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [fontsLoaded] = useFonts({
    Kanit_400Regular,
    Kanit_700Bold
  });

  function getDate() {
    const date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    const formattedDate = `${month}/${day}/${year}`;

    setDate(formattedDate);
    setTime(currentTime);
  }

  function formatCurrency(number) {
    // Convert number to string
    const numberStr = number.toString();

    // Split integer and decimal parts
    const parts = numberStr.split(".");

    // Format the integer part with commas
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Combine the formatted parts
    const formattedNumber =
      integerPart + (parts.length > 1 ? "." + parts[1] : "");

    return formattedNumber;
  }

  const handleExpiry = text => {
    let formattedText = text.replace(/[^\d\/]/g, ""); // Allow only digits and '/'

    // Enforce maximum length of 5
    if (formattedText.length > 5) {
      formattedText = formattedText.slice(0, 5);
    }

    // Insert '/' after 2 digits
    if (formattedText.length === 3 && formattedText.charAt(1) !== "/") {
      if (formattedText.charAt(2) !== "/") {
        formattedText = formattedText.split("");
        formattedText.splice(2, 0, "/");
        formattedText = formattedText.join("");
      }
    }

    // Remove '/' if backspace is pressed and length is 3
    if (formattedText.length === 3 && text.length < formattedText.length) {
      formattedText = formattedText.slice(0, -1);
    }

    setExp(formattedText);
    setExpiry(formattedText);
  };

  const RenderButton = ({ item, action }) =>
    <TouchableOpacity
      style={[
        styles.currencyItem,
        symbol === item.key && styles.currencyItemSelected
      ]}
      onPress={() => {
        if (item.screen) {
          navigation.navigate(item.screen, { symbol });
        } else {
          if (action != undefined) {
            action();
          }
        }
      }}
    >
      <Text
        style={[
          styles.text,
          item.key % 2 === 0 && styles.textAlignRight,
          { letterSpacing: 3 }
        ]}
      >
        {item.name}
      </Text>
    </TouchableOpacity>;

  useEffect(() => {
    getDate();
    const oneMinute = 20 * 1000;

    intervalRef.current = setInterval(() => {
      getDate();
    }, oneMinute);

    return () => clearInterval(intervalRef.current);
  }, []);

  const firstButton = {
    name: "Offline",
    key: 1
  };
  const secondButton = {
    name: "Tab",
    key: 2,
    screen: "Blank"
  };
  const thirdButton = {
    name: "Batch Totals",
    key: 3,
    screen: "Blank"
  };
  const fourthButton = {
    name: "Batch Review",
    key: 4,
    screen: "Blank"
  };

  return (
    <SafeAreaView style={styles.container}>
      {showOverlay &&
        <View style={styles.overlayContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>}
      {showOverlay === false &&
        <View style={styles.Vcontainer}>
          <View style={styles.DandTContainer}>
            <Text style={styles.DandT}>
              {date}
            </Text>
            <Text style={styles.DandT}>
              {time}
            </Text>
          </View>

          {/* Body of all the buttons */}
          {[
            showEnterAmount,
            showConfirmEnterAmount,
            showEnterCardNumber,
            showPin,
            showLastScreen
          ].every(element => element === false) &&
            <View style={styles.bodyContainer}>
              <View style={styles.leftPush}>
                <RenderButton
                  item={firstButton}
                  action={() => {
                    Overlay();
                    setShowEnterAmount(true);
                  }}
                />
              </View>
              <View style={styles.rightPush}>
                <RenderButton item={secondButton} />
              </View>
              <View style={styles.leftPush}>
                <RenderButton item={thirdButton} />
              </View>
              <View style={styles.rightPush}>
                <RenderButton item={fourthButton} />
              </View>
            </View>}

          {/* Body of showEnterAmount */}
          {showEnterAmount &&
            <View style={styles.bodyContainer}>
              <View>
                <Text
                  style={[
                    styles.text,
                    { fontWeight: "bold", fontSize: 30, letterSpacing: 3 }
                  ]}
                >
                  OFFLINE
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                  Amount
                </Text>
                <View style={styles.inputBox}>
                  <Text style={styles.text}>
                    {symbol}
                  </Text>
                  <TextInput
                    style={styles.textInput}
                    autoFocus={true}
                    defaultValue={enteredAmount}
                    inputMode="numeric"
                    onChangeText={text => {
                      if (text.length != 0) {
                        setAmount(text);
                        const parsedNumber = parseFloat(text.replace(/,/g, ""));
                        setEnteredAmount(formatCurrency(parsedNumber));
                      } else if (text.length <= 1) {
                        setAmount(text);
                        setEnteredAmount(text);
                      }
                    }}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  if (parseInt(amount) > 0) {
                    setShowEnterAmount(false);
                    Overlay();
                    setShowConfirmEnterAmount(true);
                  }
                }}
              >
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </View>}

          {/* Body of showConfirmEnterAmount */}
          {showConfirmEnterAmount &&
            <View style={styles.bodyContainer}>
              <View>
                <Text
                  style={[
                    styles.text,
                    { fontWeight: "bold", fontSize: 30, letterSpacing: 3 }
                  ]}
                >
                  OFFLINE
                </Text>
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={[styles.text, { fontWeight: "bold" }]}>
                  Total:
                </Text>
                <View style={styles.inputBox}>
                  <Text style={styles.text}>
                    {symbol} {" "}
                  </Text>
                  <Text style={styles.text}>
                    {enteredAmount}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  setShowEnterAmount(false);
                  setShowConfirmEnterAmount(false);
                  Overlay();
                  setShowEnterCardNumber(true);
                }}
              >
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </View>}

          {/* Body of showCardNumber */}
          {showEnterCardNumber &&
            <View style={styles.bodyContainer}>
              <View>
                <Text
                  style={[
                    styles.text,
                    { fontWeight: "bold", fontSize: 30, letterSpacing: 3 }
                  ]}
                >
                  OFFLINE
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ marginBottom: 10 }}>
                  <Text
                    style={[styles.text, { fontSize: 26, fontWeight: "bold" }]}
                  >
                    {symbol} {enteredAmount}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 27,
                      fontWeight: "bold",
                      textAlign: "center",
                      letterSpacing: 1,
                      marginVertical: 10,
                      borderBottomWidth: 1,
                      borderColor: "#000"
                    }
                  ]}
                >
                  Enter Card Details
                </Text>

                <View style={styles.inputDetails}>
                  <Text style={[styles.text, { paddingHorizontal: 5 }]}>
                    Card Number
                  </Text>
                  <TextInput
                    style={[
                      styles.textInput,
                      { marginVertical: 0, paddingTop: 5 }
                    ]}
                    autoFocus={true}
                    placeholder="0000 0000 0000 0000"
                    inputMode="numeric"
                    placeholderTextColor={"#ccc"}
                    onChangeText={text => {
                      setCardNumber(text);
                    }}
                    maxLength={16}
                  />
                </View>

                <View style={styles.inputExCvv}>
                  <View style={{ flexGrow: 1 }}>
                    <Text style={[styles.text, { paddingHorizontal: 5 }]}>
                      Expiry
                    </Text>
                    <TextInput
                      style={[
                        styles.textInput,
                        { marginVertical: 0, paddingTop: 5 }
                      ]}
                      placeholder="MM/YY"
                      inputMode="numeric"
                      value={expiry}
                      onChangeText={handleExpiry}
                      placeholderTextColor={"#ccc"}
                      maxLength={5}
                    />
                  </View>
                  <View style={{ flexGrow: 1 }}>
                    <Text style={[styles.text, { paddingHorizontal: 5 }]}>
                      CVV
                    </Text>
                    <TextInput
                      style={[
                        styles.textInput,
                        { marginVertical: 0, paddingTop: 5 }
                      ]}
                      placeholder="CVC, CAV, CID"
                      inputMode="numeric"
                      placeholderTextColor={"#ccc"}
                      onChangeText={text => {
                        setCvv(text);
                      }}
                      maxLength={3}
                    />
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  if (cardNumber.length >= 12) {
                    if (exp.length >= 5) {
                      if (cvv.length >= 3) {
                        setShowEnterAmount(false);
                        setShowConfirmEnterAmount(false);
                        setShowEnterCardNumber(false);
                        Overlay();
                        setShowPin(true);
                      }
                    }
                  }
                }}
              >
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            </View>}

          {/* Body of showPin */}
          {showPin &&
            <View style={styles.bodyContainer}>
              <View>
                <Text
                  style={[
                    styles.text,
                    { fontWeight: "bold", fontSize: 30, letterSpacing: 3 }
                  ]}
                >
                  OFFLINE
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ marginBottom: 10 }}>
                  <Text
                    style={[styles.text, { fontSize: 26, fontWeight: "bold" }]}
                  >
                    {symbol} {enteredAmount}
                  </Text>
                </View>

                <Text
                  style={[styles.text, { fontSize: 27, fontWeight: "bold" }]}
                >
                  Enter Card Pin:
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
                  onChangeText={text => {
                    setPin(text);
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  if (pin.length >= 4) {
                    setShowEnterAmount(false);
                    setShowConfirmEnterAmount(false);
                    setShowEnterCardNumber(false);
                    setShowPin(false);
                    Overlay();
                    setShowLastScreen(true);
                  }
                }}
              >
                <Text style={styles.nextText}>PAY</Text>
              </TouchableOpacity>
            </View>}

          {/* Body of ShowEnd */}
          {showLastScreen &&
            <View style={styles.bodyContainer}>
              <View>
                <Text
                  style={[
                    styles.text,
                    {
                      fontWeight: "bold",
                      fontFamily: "Kanit_400Regular",
                      fontSize: 30,
                      letterSpacing: 3
                    }
                  ]}
                >
                  OFFLINE
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ marginBottom: 10 }}>
                  <Text
                    style={[styles.text, { fontSize: 26, fontWeight: "bold" }]}
                  >
                    {symbol} {enteredAmount}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, flexGrow: 1 }}>
                <View style={{ flexGrow: 1 }}>
                  <View style={{ alignItems: "center", marginTop: 50 }}>
                    <AntDesign name="closecircle" size={60} color="red" />
                  </View>

                  <Text style={styles.bigText}>DECLINED</Text>
                  <Text style={styles.subText}>Insufficient Fund</Text>
                </View>

                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={() => {
                    setShowEnterAmount(false);
                    setShowConfirmEnterAmount(false);
                    setShowEnterCardNumber(false);
                    setShowPin(false);
                    Overlay();
                    setShowLastScreen(true);
                    handlePrint();
                  }}
                >
                  <Text style={styles.nextText}>PRINT</Text>
                </TouchableOpacity>
              </View>
            </View>}
        </View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  Vcontainer: {
    flex: 1,
    padding: 10
  },
  text: {
    fontSize: 24,
    fontFamily: "Kanit_400Regular"
  },
  DandTContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  DandT: {
    fontSize: 24,
    fontWeight: "bold"
  },
  bodyContainer: {
    flexGrow: 1,
    paddingVertical: 20
  },
  currencyItem: {
    padding: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
    borderRadius: 10,
    width: "80%"
  },
  textAlignRight: {
    textAlign: "right"
  },
  leftPush: {
    alignItems: "flex-start"
  },
  rightPush: {
    alignItems: "flex-end"
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
    padding: 10,
    backgroundColor: "#007bff",
    color: "#fff",
    marginTop: 20,
    fontFamily: "Kanit_400Regular"
  },
  inputBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Kanit_400Regular"
  },
  inputExCvv: {
    flexDirection: "row",
    marginTop: 10,
    fontFamily: "Kanit_400Regular"
  },
  bigText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    letterSpacing: 1,
    fontFamily: "Kanit_400Regular"
  },
  subText: {
    fontSize: 30,
    textAlign: "center",
    letterSpacing: 3,
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
