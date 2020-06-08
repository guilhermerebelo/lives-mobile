import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const AppStack = createStackNavigator();

import Load from "./pages/Load";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                initialRouteName="Load"
                screenOptions={{ headerShown: false }}
            >
                <AppStack.Screen name="Load" component={Load} />
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
