"use client";

import { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";

const { width, height } = Dimensions.get("window");

const memories = [
  {
    id: "1",
    image: require("../assets/images/concierto.jpg"),
    text: "🎶✨ Nuestro primer concierto juntos.",
  },
  {
    id: "2",
    image: require("../assets/images/fav.jpg"),
    text: "💫 Una cena inolvidable. (Nosotros)",
  },
  {
    id: "3",
    image: require("../assets/images/cita.jpg"),
    text: "💑🌙 Nuestro aniversario especial.",
  },
];

const MemoriesScreen = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);
  // Ref para almacenar la referencia del audio de la pantalla
  const audioRef = useRef(null);

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      setActiveIndex(Math.round(value / width));
    });
    return () => scrollX.removeListener(listener);
  }, [scrollX]);

  // Efecto para reproducir el audio (NO en bucle) al montar la pantalla
  useEffect(() => {
    async function playAudio() {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../assets/sounds/Cinema.mp3"), // Reemplaza por tu audio de fondo
          { shouldPlay: true, isLooping: false }
        );
        audioRef.current = sound;
        await sound.playAsync();
      } catch (error) {
        console.log("Error al reproducir el audio:", error);
      }
    }
    playAudio();

    // Cleanup: detener y descargar el audio al abandonar la pantalla
    return () => {
      if (audioRef.current) {
        audioRef.current.stopAsync();
        audioRef.current.unloadAsync();
        audioRef.current = null;
      }
    };
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  // Función que se ejecuta al presionar el botón:
  // Detiene el audio actual, reproduce el sonido de transición y luego navega.
  const handleButtonPress = async () => {
    try {
      // Si hay audio reproduciéndose, deténlo y descárgalo
      if (audioRef.current) {
        await audioRef.current.stopAsync();
        await audioRef.current.unloadAsync();
        audioRef.current = null;
      }
      // Crea y reproduce el sonido de transición
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/piuw.mp3") // Asegúrate de tener este archivo
      );
      await sound.playAsync();
      // Espera 500ms (o ajusta el tiempo según la duración deseada)
      setTimeout(() => {
        sound.unloadAsync();
        navigation.navigate("Countdown");
      }, 500);
    } catch (error) {
      console.log("Error al reproducir el sonido de transición:", error);
      navigation.navigate("Countdown");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#ff758c", "#ff7eb3"]} style={styles.background} />

      <Text style={styles.title}>💕 Nuestros Momentos Especiales 💕</Text>

      {/* Carrusel de recuerdos */}
      <FlatList
        data={memories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={width * 0.75}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Paginación */}
      <View style={styles.pagination}>
        {memories.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex ? styles.paginationDotActive : null,
            ]}
          />
        ))}
      </View>

      {/* Botón de continuar que activa el sonido de transición y navega */}
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <AntDesign name="heart" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Seguir Explorando ✨</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingVertical: height * 0.05,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 20,
    paddingHorizontal: 20,
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  flatListContent: {
    alignItems: "center",
    paddingHorizontal: width * 0.02,
  },
  itemContainer: {
    width: width * 0.7,
    height: height * 0.4,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginHorizontal: width * 0.015,
  },
  image: {
    width: "100%",
    height: "85%",
    resizeMode: "cover",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  text: {
    color: "#333",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: "100%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 6,
  },
  paginationDotActive: {
    backgroundColor: "#FFFFFF",
    transform: [{ scale: 1.3 }],
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 105, 180, 0.85)",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Poppins-Bold",
  },
});

export default MemoriesScreen;
