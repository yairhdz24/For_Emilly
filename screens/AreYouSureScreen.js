"use client"

import { useState, useEffect, useRef } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image, SafeAreaView } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")

const AreYouSureScreen = ({ navigation }) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const fadeAnim = useRef(new Animated.Value(0)).current
  const noButtonSize = { width: 150, height: 50 }

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
    moveNoButton()
  }, [fadeAnim]) // Added fadeAnim to dependencies

  const moveNoButton = () => {
    const newX = Math.random() * (width - noButtonSize.width)
    const newY = Math.random() * (height - noButtonSize.height - 100) + 100 // Ensure button doesn't overlap with the image
    setNoButtonPosition({ x: newX, y: newY })
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#1a1a1a", "#4a1a2b"]} style={styles.background} />
      <Image source={require("../assets/images/sad.png")} style={styles.image} resizeMode="contain" />
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>¿De verdad, de verdad estás segura?</Text>
          <Text style={styles.subText}>Piénsalo una vez más...</Text>
        </View>

        <TouchableOpacity style={styles.yesButton} onPress={() => navigation.navigate("Question")}>
          <AntDesign name="heart" size={24} color="white" />
          <Text style={styles.buttonText}>No, mejor regreso</Text>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.noButtonContainer,
            {
              transform: [{ translateX: noButtonPosition.x }, { translateY: noButtonPosition.y }],
            },
          ]}
        >
          <TouchableOpacity style={styles.noButton} onPress={moveNoButton}>
            <AntDesign name="close" size={24} color="white" />
            <Text style={styles.buttonText}>Sí, estoy segura</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
    alignSelf: "center",
    marginTop: 20,
  },
  textContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#FF69B4",
    marginBottom: 10,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subText: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    color: "#FF69B4",
    marginBottom: 40,
    textAlign: "center",
  },
  yesButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#32CD32",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  noButtonContainer: {
    position: "absolute",
    width: 150,
    height: 50,
  },
  noButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6347",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    width: "100%",
    height: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    marginLeft: 10,
  },
})

export default AreYouSureScreen

