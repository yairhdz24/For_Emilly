"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from "react-native";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const TreasureScreen = ({ navigation }) => {
  const [hasKey, setHasKey] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const shakeAnimation = new Animated.Value(0);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    const key = await AsyncStorage.getItem("hasKey");
    setHasKey(key === "true");
  };

  const handleChestPress = () => {
    if (!hasKey) {
      // Si no tienes la llave, se muestra una animación de "temblor" y se muestra un mensaje de ayuda.
      setIsShaking(true);
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
      ]).start(() => setIsShaking(false));
    } else {
      // Si tienes la llave, navega a GiftScreen
      navigation.navigate("Gift");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Has encontrado tu regalo especial!</Text>
      <Text style={styles.subtitle}>
        {hasKey
          ? "¡Usa tu llave para abrirlo y descubrir la sorpresa!"
          : "Aún no tienes la llave, pero no te preocupes, el pendejito de tu novio la escondio muy bien, el te ayudara..."}
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

      {!hasKey && (
        <Text style={styles.hint}>
          Pista: La llave está oculta en el código...💀💀
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 20,
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
    opacity: 0.8,
  },
});

export default TreasureScreen;
