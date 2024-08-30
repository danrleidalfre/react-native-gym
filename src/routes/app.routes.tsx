import { BottomTabNavigationProp, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "@screens/Home";

import HomeSvg from '@assets/home.svg'
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { Platform } from "react-native";

type AppRoutes = {
  home: undefined
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
          tabBarIcon: () => 
            <HomeSvg
              fill={colors.green500}
              width={space[6]}
              height={space[6]} 
            />
        }}
      />
    </Navigator>
  )
}