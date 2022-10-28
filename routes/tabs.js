import React from "react"
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import { colors } from '../utils/colors';
import HomeScreen from "../screens/home";
import ControllerScreen from "../screens/controller";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();
const { tertiary, secondary, dark } = colors;

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Map"
      activeColor={secondary}
      inactiveColor={dark}
      barStyle={{backgroundColor: tertiary}}>
      <Tab.Screen
        name="Map"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home-roof" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Controller"
        component={ControllerScreen}
        options={{
          tabBarLabel: 'Controller',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="gamepad-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;