"use client"

import { useEffect, useRef } from "react"
import { View, Text, StyleSheet, Animated, TouchableOpacity } from "react-native"
import { AntDesign } from "@expo/vector-icons"

export const MainScreen = ({ navigation }) => {
  const scaleValue = useRef(new Animated.Value(1)).current
  const fadeValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ),
    ]).start()
  }, [scaleValue, fadeValue])

  const handlePress = () => {
    navigation.navigate("Question")
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.heartContainer, { opacity: fadeValue, transform: [{ scale: scaleValue }] }]}>
        <AntDesign name="heart" size={100} color="#FF69B4" />
      </Animated.View>
      <Animated.Text style={[styles.title, { opacity: fadeValue }]}>Una pregunta especial para ti</Animated.Text>
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Toca para descubrir</Text>
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
  heartContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF1493",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FF69B4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})

