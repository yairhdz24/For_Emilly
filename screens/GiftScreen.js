"use client";

import React, { useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions 
} from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const GiftScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;

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
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      {/* Animación de fondo para dar un toque especial
      <LottieView
        source={require("../assets/sparkles.json")} // Asegúrate de tener este archivo o cámbialo por otro de fondo
        autoPlay
        loop
        style={styles.backgroundAnimation}
      /> */}
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        {/* Contenedor de la animación del anillo */}
        <View style={styles.animationContainer}>
          <LottieView
            source={require("../assets/ring.json")}
            autoPlay
            loop
            style={styles.ringAnimation}
          />
        </View>
        <Text style={styles.title}>¡Has llegado a tu regalo especial!</Text>
        <Text style={styles.description}>
          Este anillo simboliza mi amor eterno por ti. Quiero que cada latido de mi corazón te recuerde lo importante que eres para mí. ¿Te unirás a este sueño de amor infinito?
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    alignItems: "center",
    zIndex: 2,
  },
  animationContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  ringAnimation: {
    width: width * 0.7,
    height: width * 0.7,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#FF1493",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(255,20,147,0.5)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  description: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#FF69B4",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  backgroundAnimation: {
    position: "absolute",
    width: width,
    height: height,
    zIndex: 1,
  },
});

export default GiftScreen;
