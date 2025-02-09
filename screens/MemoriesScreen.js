"use client"

import { useState, useRef, useEffect } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, Animated } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

const { width, height } = Dimensions.get("window")
const ITEM_WIDTH = width * 0.85
const ITEM_HEIGHT = height * 0.7

const memories = [
  { id: "1", image: require("../assets/images/concierto.jpg"), text: "Nuestro primer concierto juntos" },
  { id: "2", image: require("../assets/images/fav.jpg"), text: "Aquella cena inolvidable" },
  { id: "3", image: require("../assets/images/cita.jpg"), text: "Nuestro aniversario" },
]

const MemoriesScreen = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current
  const [dimensions, setDimensions] = useState({ width, height })

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({ width: window.width, height: window.height })
    })
    return () => subscription?.remove()
  }, [])

  const renderItem = ({ item, index }) => {
    const inputRange = [(index - 1) * dimensions.width, index * dimensions.width, (index + 1) * dimensions.width]

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    })

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.4, 1, 0.4],
      extrapolate: "clamp",
    })

    return (
      <Animated.View style={[styles.itemContainer, { transform: [{ scale }], opacity }]}>
        <Image source={item.image} style={styles.image} />
        <LinearGradient colors={["transparent", "rgba(0,0,0,0.8)"]} style={styles.gradient}>
          <Text style={styles.text}>{item.text}</Text>
        </LinearGradient>
      </Animated.View>
    )
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#4c669f", "#3b5998", "#192f6a"]} style={styles.background} />
      <Text style={styles.title}>Nuestros Recuerdos</Text>
      <View style={styles.carouselContainer}>
        <Animated.FlatList
          data={memories}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / dimensions.width)
            setActiveIndex(newIndex)
          }}
          contentContainerStyle={styles.flatListContent}
          snapToInterval={dimensions.width}
          decelerationRate="fast"
        />
      </View>
      <View style={styles.pagination}>
        {memories.map((_, index) => (
          <View key={index} style={[styles.paginationDot, index === activeIndex ? styles.paginationDotActive : null]} />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Countdown")}>
        <AntDesign name="heart" size={24} color="white" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 32,
    fontFamily: "Poppins-Bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  carouselContainer: {
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  flatListContent: {
    alignItems: "center",
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: "cover",
    borderRadius: 20,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    paddingHorizontal: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 8,
  },
  paginationDotActive: {
    backgroundColor: "#FFFFFF",
    transform: [{ scale: 1.2 }],
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 20, 147, 0.8)",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins-Bold",
  },
})

export default MemoriesScreen

