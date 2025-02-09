"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native"
import LottieView from "lottie-react-native"

const { width, height } = Dimensions.get("window")

const GiftScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start()
  }, [fadeAnim, scaleAnim]) // Added fadeAnim and scaleAnim as dependencies

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <LottieView source={require("../assets/ring.json")} autoPlay loop style={styles.ringAnimation} />
        <Text style={styles.text}>Este anillo simboliza mi amor eterno por ti...</Text>
        <Text style={styles.subText}>¿Me harías el honor de ser mi San Valentín por siempre?</Text>
      </Animated.View>
      {/* <LottieView source={require("../assets/sparkles.json")} autoPlay loop style={styles.backgroundAnimation} /> */}
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
  content: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  ringAnimation: {
    width: width * 0.8,
    height: width * 0.8,
  },
  backgroundAnimation: {
    position: "absolute",
    width: width,
    height: height,
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#FFD700",
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subText: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    color: "#FFD700",
    textAlign: "center",
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
})

export default GiftScreen

