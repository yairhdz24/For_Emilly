"use client";

import React, { useEffect, useRef, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  TouchableOpacity, 
  Dimensions, 
  Image 
} from "react-native";
import LottieView from "lottie-react-native";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

const ConfirmationScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [unlocked, setUnlocked] = useState(false);
  // Define la fecha de desbloqueo: 14 de febrero de 2025 (ajusta la zona horaria si es necesario)
  const unlockDate = new Date("2025-02-14T09:00:00");
  const soundRef = useRef(null);

  // Animación de fade-in para el contenido
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Reproduce un sonido de confirmación al montar el componente
  useEffect(() => {
    let sound;
    async function playSound() {
      try {
        const { sound: s } = await Audio.Sound.createAsync(
          require("../assets/sounds/cilemorron.mp3") // Ajusta la ruta a tu sonido
        );
        sound = s;
        soundRef.current = s;
        await s.playAsync();
      } catch (error) {
        console.log("Error al reproducir el sonido:", error);
      }
    }
    playSound();

    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, []);

  // Actualiza el estado 'unlocked' verificando si ya es 14 de febrero o posterior.
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (new Date() >= unlockDate) {
        setUnlocked(true);
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Función que se ejecuta al presionar el botón. Si está desbloqueado, navega a "Treasure".
  const handlePress = () => {
    if (unlocked) {
      navigation.navigate("Treasure");
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Contenedor de la imagen y animación */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/chilemorron.png")} // Reemplaza con tu imagen
            style={styles.image}
          />
          <LottieView
            source={require("../assets/corazones-celebracion.json")}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        {/* Texto principal */}
        <Text style={styles.thankYouText}>¡Gracias, mi amor! 💖</Text>

        {/* Mensaje romántico */}
        <Text style={styles.messageText}>
          Yo sabía que me ibas a decir que sí {'>'}//{'<'}. ✨  
          Este es solo el inicio de una historia hermosa que seguimos escribiendo juntos 💖.  
          Eres mi más grande amor, mi todo, Te Amoo!!💖💖💫
        </Text>

        {/* Botón que muestra el estado de desbloqueo */}
        <TouchableOpacity
          style={[styles.treasureButton, !unlocked && styles.treasureButtonDisabled]}
          onPress={handlePress}
          disabled={!unlocked}
        >
          <Text style={styles.buttonText}>
            {unlocked
              ? "🎁 Ver tu regalo especial"
              : "Esta sorpresa se desbloquea el 14 de febrero 👀"}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    width: width * 0.8,
    height: height * 0.4,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  animation: {
    position: "absolute",
    width: "120%",
    height: "120%",
  },
  thankYouText: {
    fontSize: 30,
    fontFamily: "Poppins-Bold",
    color: "#FF1493",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "#FF1493",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  messageText: {
    fontSize: width * 0.045,
    fontFamily: "Poppins-Regular",
    color: "#FF69B4",
    textAlign: "center",
    marginBottom: 25,
    paddingHorizontal: 15,
  },
  treasureButton: {
    width: 260,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#FF1493",
    shadowColor: "#FF69B4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 5,
    marginTop: 10,
  },
  treasureButtonDisabled: {
    backgroundColor: "#AAA", // color gris para indicar que está bloqueado
  },
  treasureButtonUnlocked: {
    backgroundColor: "#32CD32", // color verde para indicar que está desbloqueado
  },
  buttonText: {
    color: "#FFD700",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default ConfirmationScreen;
