"use client"

import { useState, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native"
import LottieView from "lottie-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const { width } = Dimensions.get("window")

const TreasureScreen = ({ navigation }) => {
  const [hasKey, setHasKey] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const shakeAnimation = new Animated.Value(0)

  useEffect(() => {
    checkKey()
  }, [])

  const checkKey = async () => {
    const key = await AsyncStorage.getItem("hasKey")
    setHasKey(key === "true")
  }

  const handleChestPress = () => {
    if (!hasKey) {
      setIsShaking(true)
      Animated.sequence([
        Animated.timing(shakeAnimation, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnimation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => setIsShaking(false))
    } else {
      navigation.navigate("Gift")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Has encontrado el tesoro!</Text>
      <Text style={styles.subtitle}>
        {hasKey ? "¡Usa tu llave para abrirlo!" : "Necesitas encontrar la llave secreta..."}
      </Text>

      <Animated.View
        style={[
          styles.chestContainer,
          {
            transform: [{ translateX: shakeAnimation }],
          },
        ]}
      >
        <TouchableOpacity onPress={handleChestPress}>
          <LottieView
            source={require("../assets/box.json")}
            autoPlay
            loop={!hasKey}
            style={styles.chestAnimation}
          />
        </TouchableOpacity>
      </Animated.View>

      {!hasKey && <Text style={styles.hint}>Pista: La llave está escondida en el código de programación...</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#FFD700",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    color: "#FFD700",
    marginBottom: 30,
    textAlign: "center",
  },
  chestContainer: {
    width: width * 0.8,
    height: width * 0.8,
  },
  chestAnimation: {
    width: "100%",
    height: "100%",
  },
  hint: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    color: "#FFD700",
    marginTop: 30,
    textAlign: "center",
    opacity: 0.7,
  },
})

export default TreasureScreen

