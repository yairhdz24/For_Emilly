"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native"
import LottieView from "lottie-react-native"
import { AntDesign } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

const QuestionScreen = ({ navigation }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.5)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, scaleAnim])

  const moveNoButton = () => {
    const newX = Math.random() * (width - 150)
    const newY = Math.random() * (height - 100)
    setNoButtonPosition({ x: newX, y: newY })
  }

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/Background-corazon.json")}
        autoPlay
        loop
        style={styles.animation}
        resizeMode="cover"
      />
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <LinearGradient colors={["rgba(255,255,255,0.8)", "rgba(255,192,203,0.8)"]} style={styles.questionContainer}>
          <Text style={styles.questionText}>¿Quieres ser mi San Valentín?</Text>
        </LinearGradient>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.yesButton} onPress={() => navigation.navigate("Confirmation")}>
            <AntDesign name="heart" size={24} color="white" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Sí</Text>
          </TouchableOpacity>
          <Animated.View
            style={[
              styles.noButtonContainer,
              {
                transform: [{ translateX: noButtonPosition.x }, { translateY: noButtonPosition.y }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.noButton}
              onPress={() => {
                moveNoButton()
                navigation.navigate("No")
              }}
            >
              <AntDesign name="close" size={24} color="white" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
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
    position: "absolute",
    width: width,
    height: height,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    width: "100%",
  },
  questionContainer: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  questionText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF1493",
    textAlign: "center",
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  yesButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#32CD32",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noButtonContainer: {
    position: "absolute",
    top: 70,
  },
  noButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6347",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  buttonIcon: {
    marginRight: 5,
  },
})

export default QuestionScreen

