import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";

import { Profile } from "@screens/Profile";
import { Barbell, House, UserCircle } from 'phosphor-react-native';
import { Platform } from "react-native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

type AppRoutes = {
  home: undefined
  exercise: undefined
  profile: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { tokens } = gluestackUIConfig
  const { colors, space } = tokens

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green500,
        tabBarInactiveTintColor: colors.gray200,
        tabBarStyle: {
          backgroundColor: colors.gray600,
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 96,
          paddingBottom: space[10],
          paddingTop: space[6]
        }
      }}
    >
      <Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({ color }) =>
            <House color={color} />
        }}
      />
      <Screen
        name='exercise'
        component={Home}
        options={{
          tabBarIcon: ({ color }) =>
            <Barbell color={color} />
        }}
      />
      <Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) =>
            <UserCircle color={color} />
        }}
      />
    </Navigator>
  )
}