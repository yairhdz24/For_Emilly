"use client";
import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

const NoScreen = ({ navigation }) => {
  useEffect(() => {
    let soundObject;

    // Función para cargar y reproducir el sonido
    async function playSound() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/sounds/miau-triste.mp3")
        );
        soundObject = sound;
        await sound.playAsync();
      } catch (error) {
        console.log("Error al reproducir el sonido:", error);
      }
    }

    playSound();

    // Cuando se desmonte el componente, detiene y descarga el sonido
    return () => {
      if (soundObject) {
        soundObject.stopAsync();    // Detiene la reproducción inmediatamente
        soundObject.unloadAsync();  // Libera el recurso del sonido
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#1a1a1a", "#4a1a2b"]} style={styles.background} />
      <View style={styles.content}>
        <Image
          source={require("../assets/images/sad.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>¿Estás segura de tu respuesta?</Text>
          <Text style={styles.subText}>Piénsalo bien...</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AreYouSure")}
          >
            <AntDesign name="check" size={24} color="white" />
            <Text style={styles.buttonText}>Sí, estoy segura</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() => navigation.navigate("Question")}
          >
            <AntDesign name="back" size={24} color="#FF69B4" />
            <Text style={styles.returnButtonText}>
              Mejor lo pienso de nuevo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.3,
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
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF1493",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 15,
    width: "80%",
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
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginLeft: 10,
  },
  returnButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#FF69B4",
    width: "80%",
  },
  returnButtonText: {
    color: "#FF69B4",
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    marginLeft: 10,
  },
});

export default NoScreen;
