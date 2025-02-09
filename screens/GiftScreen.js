"use client";

import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  BackHandler, // Importamos BackHandler
} from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const GiftScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const titleAnim = useRef(new Animated.Value(-100)).current;
  const descriptionAnim = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(titleAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(descriptionAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim, titleAnim, descriptionAnim]);

  return (
    <LinearGradient colors={["#FF69B4", "#FF1493"]} style={styles.container}>
      <BlurView intensity={20} style={styles.blurContainer}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.animationContainer}>
            <LottieView
              source={require("../assets/ring.json")}
              autoPlay
              loop
              style={styles.ringAnimation}
            />
          </View>
          <Animated.Text
            style={[styles.title, { transform: [{ translateY: titleAnim }] }]}
          >
            ¡Has recibido tu anillo de promesa!
          </Animated.Text>
          <Animated.Text
            style={[
              styles.description,
              { transform: [{ translateY: descriptionAnim }] },
            ]}
          >
            Este anillo de promesa simboliza nuestro compromiso eterno. Cada latido
            de mi corazón es una promesa de amarte sin condiciones. ¿Aceptas ser mi
            compañero de por vida?
          </Animated.Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              // Cierra la aplicación (funciona en Android)
              BackHandler.exitApp();
            }}
          >
            <Text style={styles.buttonText}>Acepto tu compromiso 💍</Text>
          </TouchableOpacity>
        </Animated.View>
      </BlurView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    overflow: "hidden",
  },
  animationContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  ringAnimation: {
    width: width * 0.6,
    height: width * 0.6,
    maxWidth: 300,
    maxHeight: 300,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  description: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: "#FFFFFF",
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.4)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
  },
});

export default GiftScreen;
