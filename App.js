import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import WelcomeScreen from "./screens/WelcomeScreen"
import StoryScreen from "./screens/StoryScreen"
import MemoriesScreen from "./screens/MemoriesScreen"
import CountdownScreen from "./screens/CountdownScreen"
import QuestionScreen from "./screens/QuestionScreen"
import ConfirmationScreen from "./screens/ConfirmationScreen"
import NoScreen from "./screens/NoScreen"
import TreasureScreen from "./screens/TreasureScreen"
import GiftScreen from "./screens/GiftScreen"
import AreYouSureScreen from "./screens/AreYouSureScreen"

const Stack = createStackNavigator()

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#FFF0F5" },
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Story" component={StoryScreen} />
          <Stack.Screen name="Memories" component={MemoriesScreen} />
          <Stack.Screen name="Countdown" component={CountdownScreen} />
          <Stack.Screen name="Question" component={QuestionScreen} />
          <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
          <Stack.Screen name="No" component={NoScreen} />
          <Stack.Screen name="AreYouSure" component={AreYouSureScreen} />
          <Stack.Screen name="Treasure" component={TreasureScreen} />
          <Stack.Screen name="Gift" component={GiftScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

