"use client"

import { useEffect, useRef } from "react"
import { Animated, Dimensions, View } from "react-native"

const { width, height } = Dimensions.get("window")
const CHARACTERS = "0123456789"
const FONT_SIZE = 14
const COLUMNS = Math.floor(width / FONT_SIZE)
const DROPS = Array.from({ length: COLUMNS }, () => -Math.random() * height)

const MatrixRain = () => {
  const characters = useRef(
    DROPS.map(() =>
      Array.from({ length: Math.ceil(height / FONT_SIZE) }, () => ({
        char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
        opacity: new Animated.Value(0),
        y: new Animated.Value(0),
      })),
    ),
  ).current

  useEffect(() => {
    const animations = characters.map((column, i) =>
      column.map((drop, j) =>
        Animated.sequence([
          Animated.delay(i * 100 + j * 50),
          Animated.parallel([
            Animated.timing(drop.opacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(drop.y, {
              toValue: height,
              duration: 15000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ),
    )

    const animate = () => {
      animations.forEach((column) =>
        column.forEach((animation) => {
          animation.reset()
          animation.start()
        }),
      )
    }

    animate()
    const interval = setInterval(animate, 15000)
    return () => clearInterval(interval)
  }, [characters]) // Added characters to the dependency array

  return (
    <View style={{ position: "absolute", width, height }}>
      {characters.map((column, i) =>
        column.map((drop, j) => (
          <Animated.Text
            key={`${i}-${j}`}
            style={{
              position: "absolute",
              left: i * FONT_SIZE,
              transform: [{ translateY: drop.y }],
              opacity: drop.opacity,
              color: "#00FF00",
              fontSize: FONT_SIZE,
            }}
          >
            {drop.char}
          </Animated.Text>
        )),
      )}
    </View>
  )
}

export default MatrixRain

