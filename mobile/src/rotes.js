import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import LoginPage from "./pages/Login";
import MapPage from "./pages/Map";
import MakerPage from "./pages/Maker";

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
      
        <AppStack.Screen name="MapPage" component={MapPage} />
        <AppStack.Screen name="LoginPage" component={LoginPage} />
        <AppStack.Screen name="MakerPage" component={MakerPage} />  
        
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
