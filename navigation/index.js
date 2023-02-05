import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, MovieDetail } from '../screeens'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { TabIcon } from '../components';

const tab = createBottomTabNavigator()
const stack = createNativeStackNavigator()


const Tabs = () => (
  <tab.Navigator
    initialRouteName='home'
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        backgroundColor: COLORS.black,
        borderTopColor: "transparent",
        height: 100,
      }
    }}
  >
    <tab.Screen
      name='home'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon={icons.home}
          />
        )
      }}
    />
    <tab.Screen
      name='play'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon={icons.play_button}
          />
        )
      }}
    />
    <tab.Screen
      name='search'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon={icons.search}
          />
        )
      }}
    />
    <tab.Screen
      name='Profile'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <TabIcon
            focused={focused}
            icon={icons.profile}
          />
        )
      }}
    />
  </tab.Navigator>
);

const Stack = () => (
  <stack.Navigator
    initialRouteName='home'
    screenOptions={{
      headerShown: false
    }}
  >
    <stack.Screen
      name='home'
      component={Tabs}
    />
    <stack.Screen
      name='movieDetail'
      component={MovieDetail}
    />
  </stack.Navigator>
);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent"
  }
};

const Index = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack />
    </NavigationContainer>
  );
};

export default Index;
