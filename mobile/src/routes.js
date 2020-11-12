import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Login/profile";
import MapPage from "./pages/Map";
import MakerPage from "./pages/Maker";
import TestePage from "./pages/teste/teste.js";
import PosLogin from './pages/Login/posLogin.js'

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
      
        <AppStack.Screen name="LoginPage" component={LoginPage} />
        <AppStack.Screen name="MapPage" component={MapPage} />
        <AppStack.Screen name="PosLogin" component={PosLogin} />
        <AppStack.Screen name="ProfilePage" component={ProfilePage} />
        <AppStack.Screen name="MakerPage" component={MakerPage} />  
        <AppStack.Screen name="TestePage" component={TestePage} />  
        
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
