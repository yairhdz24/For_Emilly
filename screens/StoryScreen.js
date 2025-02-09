"use client"

import { useEffect, useRef, useState } from "react"
import { View, Text, StyleSheet, Animated, TouchableOpacity, Dimensions } from "react-native"
import LottieView from "lottie-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const { width, height } = Dimensions.get("window")

const StoryScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [showKey, setShowKey] = useState(false)
  const secretButtonPosition = useRef({ x: width * 0.1, y: height * 0.3 }).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  const handleSecretPress = () => {
    setShowKey(true)
    AsyncStorage.setItem("hasKey", "true")
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <LottieView source={require("../assets/hacker1.json")} autoPlay loop style={styles.animation} />

        <Text style={styles.title}>Un mensaje secreto para ti...</Text>

        <Text style={styles.text}>
          En el silencio de la noche, cuando todos dormían, yo soñaba despierto. 
          Entre líneas de código y suspiros, construí un rincón donde solo tú y yo existimos.
          Cada detalle, cada píxel, lleva impreso el amor con el que fue creado. 
        </Text>

        <Text style={styles.text}>
          No es solo una historia... es una llave. Un portal hacia nuestros recuerdos más valiosos. 
          ¿Podrás encontrarla?
        </Text>

        {/* Botón secreto para revelar la llave */}
        <TouchableOpacity
          style={[
            styles.secretButton,
            {
              position: "absolute",
              left: secretButtonPosition.x,
              top: secretButtonPosition.y,
            },
          ]}
          onPress={handleSecretPress}
        />

        {showKey && (
          <Animated.View style={styles.keyContainer}>
            <LottieView source={require("../assets/key.json")} autoPlay loop={false} style={styles.keyAnimation} />
            <Text style={styles.keyText}>¡Has encontrado la llave del tesoro! ✨</Text>
          </Animated.View>
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Memories")}>
          <Text style={styles.buttonText}>Descubre más...</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    zIndex: 2,
  },
  animation: {
    width: width * 0.8,
    height: width * 0.8,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#00FF00",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "#00FF00",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  text: {
    fontSize: width * 0.045,
    fontFamily: "Poppins-Regular",
    color: "#00FF00",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "#00FF00",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  button: {
    backgroundColor: "#00FF00",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#00FF00",
    shadowColor: "#00FF00",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
  secretButton: {
    width: 50,
    height: 50,
    backgroundColor: "transparent",
  },
  keyContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.9)",
    width: "100%",
    height: "100%",
  },
  keyAnimation: {
    width: 200,
    height: 200,
  },
  keyText: {
    color: "#00FF00",
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    marginTop: 20,
  },
})

export default StoryScreen
