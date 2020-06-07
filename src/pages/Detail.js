import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { Header, ListItem, Icon } from "react-native-elements";

// nao consegui utlizar
import GestureRecognizer from "react-native-swipe-gestures";

import { useNavigation } from "@react-navigation/native";

export default function Detail() {
    let [valor, setValor] = useState();

    useEffect(() => setValor("aaaa"), [valor]);

    const navigation = useNavigation();

    function backRouter() {
        navigation.navigate("Home");
    }

    return (
        <GestureRecognizer onSwipeLeft={() => backRouter()}>
            <Header
                containerStyle={{ backgroundColor: "#af2b2b" }}
                leftComponent={{
                    icon: "left",
                    color: "#fff",
                    type: "antdesign",
                    onPress: backRouter,
                }}
                centerComponent={{
                    text: "LIVE MARÍLIA MENDONÇA",
                    style: { color: "#fff" },
                }}
            />
            <Text>{valor}</Text>
        </GestureRecognizer>
    );
}
