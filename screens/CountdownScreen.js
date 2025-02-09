"use client";

import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

// Arreglo de versos con su tiempo de aparición en segundos
const lyrics = [
  { time: 0.5, text: "Ah, se enciende 🔥" },
  { time: 3.7, text: "Coquetea 😏" },
  { time: 5.8, text: "Se evapora 💨" },
  { time: 8.2, text: "Y yo qué sé dónde va, dónde vive 🤔" },
  { time: 11.2, text: "Y todo está mal 😔" },
  { time: 12.7, text: "Y siempre es igual 😕" },
  { time: 14.2, text: "Y yo qué sé, yo no soy detective 🕵️‍♂️" },
  { time: 15.8, text: "La paso fatal 😣" },
  { time: 18.8, text: "Mi chica de humo 💨💖" },
  { time: 20.8, text: "Mi chica de humo 💕" },
  { time: 22.8, text: "Uh, y yo qué sé dónde va, dónde vive 🤷‍♂️" },
  { time: 24.8, text: "Y todo está mal 😞" },
  { time: 26.8, text: "Y siempre es igual 😑" },
  { time: 29.8, text: "Y yo qué sé, yo no soy detective 🕵️‍♂️" },
  { time: 32.3, text: "La paso fatal 😢" },
  { time: 34.3, text: "Mi chica de humo 💓" },
  { time: 38.3, text: "Mi chica de humo 💖" },
];



const CountdownScreen = ({ navigation }) => {
  const [daysLeft, setDaysLeft] = useState(0);
  const [currentLyric, setCurrentLyric] = useState("");
  const [songFinished, setSongFinished] = useState(false);
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Calcula los días hasta San Valentín (se mantiene)
  useEffect(() => {
    const valentinesDay = new Date("2025-02-14T00:00:00");
    const today = new Date();
    const timeDiff = valentinesDay.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    setDaysLeft(daysDiff);

    // Aquí se podrían programar notificaciones, si se desea
    // scheduleNotifications();
  }, []);

  // Animación de fade-in para todo el contenido
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Efecto para reproducir la canción de 40 segundos y detectar cuando termina
  useEffect(() => {
    async function playSong() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/sounds/La Chica de Humo.mp3"), // Tu canción de 40 seg
          { shouldPlay: true, isLooping: false }
        );
        audioRef.current = sound;
        // Actualiza el estado cuando la canción termina
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setSongFinished(true);
          }
        });
        await sound.playAsync();
      } catch (error) {
        console.log("Error al reproducir la canción:", error);
      }
    }
    playSong();
    return () => {
      if (audioRef.current) {
        audioRef.current.stopAsync();
        audioRef.current.unloadAsync();
      }
    };
  }, []);

  // Efecto para sincronizar y actualizar el verso actual
  useEffect(() => {
    const totalDuration = 40; // Duración en segundos de la canción
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      let current = lyrics[0].text;
      for (let i = 0; i < lyrics.length; i++) {
        if (elapsed >= lyrics[i].time) {
          current = lyrics[i].text;
        } else {
          break;
        }
      }
      setCurrentLyric(current);
      if (elapsed >= totalDuration) {
        clearInterval(timerRef.current);
      }
    }, 100);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <LinearGradient colors={["#FFB6C1", "#FF69B4"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <LottieView
          source={require("../assets/countdown.json")}
          autoPlay
          loop
          style={styles.animation}
        />
        <View style={styles.countdownContainer}>
          <Text style={styles.countdownText}>{daysLeft}</Text>
          <Text style={styles.daysText}>Días para San Valentín {'<'}3</Text>
        </View>
        <View style={styles.messageContainer}>
          {/* En lugar de frases aleatorias, mostramos la letra sincronizada */}
          <Text style={styles.messageText}>{currentLyric}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={!songFinished}
          onPress={() => navigation.navigate("Question")}
        >
          <AntDesign
            name="heart"
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonText}>
            {songFinished
              ? "Continuar a la sorpresa"
              : "Espera a que termine la canción"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  animation: {
    width: width * 0.8,
    height: width * 0.8,
  },
  countdownContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 72,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  daysText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  messageContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  messageText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 20, 147, 0.8)",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CountdownScreen;
