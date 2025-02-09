

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import LottieView from "lottie-react-native"

const CountdownScreen = ({ navigation }) => {
  const [daysLeft, setDaysLeft] = useState(0)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const valentinesDay = new Date("2025-02-14T00:00:00")
    const today = new Date()
    const timeDiff = valentinesDay.getTime() - today.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    setDaysLeft(daysDiff)

    // Aquí puedes definir tus mensajes diarios
    const messages = [
      "Cada día que pasa, mi amor por ti crece más.",
      "Estoy contando los momentos hasta que estemos juntos.",
      "Tu sonrisa ilumina mis días.",
      "No puedo esperar para abrazarte.",
      "Eres lo mejor que me ha pasado.",
    ]
    setMessage(messages[Math.floor(Math.random() * messages.length)])
  }, [])

  return (
    <View style={styles.container}>
      <LottieView source={require("../assets/countdown.json")} autoPlay loop style={styles.animation} />
      <Text style={styles.countdownText}>{daysLeft} días para San Valentín</Text>
      <Text style={styles.messageText}>{message}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Question")}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF0F5",
  },
  animation: {
    width: 200,
    height: 200,
  },
  countdownText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF1493",
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    color: "#FF69B4",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#FF1493",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default CountdownScreen

