const LOCAL_DATE = "YYYY-MM-DD";

import * as Linking from "expo-linking";

import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";

import moment from "moment/min/moment-with-locales";
moment.locale("pt-BR");

// let DAY = moment().format(LOCAL_DATE);
let lives = {};

import { Header, ListItem, Icon } from "react-native-elements";

export default function Home({ route }) {
    const lives = route.params.lives[route.params.date].lives;
    console.log("testeee");

    const navigation = useNavigation();

    function viewDetails(item) {
        navigation.navigate("Detail", item);
    }

    function before() {
        let date = moment(route.params.date)
            .subtract(1, "day")
            .format(LOCAL_DATE);

        navigation.navigate("Home", {
            ...route.params.lives,
            date,
        });

        // if (!lives.data[DAY]) {
        //     return;
        // }

        // setLiveToday(lives.data[DAY].lives);
    }

    function after() {
        let date = moment(route.params.date).add(1, "day").format(LOCAL_DATE);

        navigation.navigate("Home", {
            ...route.params.lives,
            date,
        });

        // if (!lives.data[DAY]) {
        //     return;
        // }

        // setLiveToday(lives.data[DAY].lives);
    }

    function goYoutube(url) {
        Linking.openURL(url);
    }

    function getDay() {
        return moment(route.params.date).format("dddd").toUpperCase();
    }

    return (
        <>
            <GestureRecognizer onSwipeLeft={after} onSwipeRight={before}>
                <Header
                    containerStyle={{ backgroundColor: "#af2b2b" }}
                    leftComponent={{
                        icon: "left",
                        color: "#fff",
                        type: "antdesign",
                        onPress: before,
                    }}
                    rightComponent={{
                        icon: "right",
                        color: "#fff",
                        type: "antdesign",
                        onPress: after,
                    }}
                    centerComponent={{
                        text: `LIVES ${getDay()} ${moment(
                            route.params.date
                        ).format("DD/MM")}`,
                        style: { color: "#fff" },
                    }}
                />

                <ScrollView>
                    {lives.map((item, index) => (
                        <>
                            <ListItem
                                key={index}
                                title={`${item.horario} - ${item.description}`}
                                bottomDivider
                                chevron={{ onPress: () => viewDetails(item) }}
                                rightIcon={{
                                    name: "youtube",
                                    type: "antdesign",
                                    color: "#FF0000",
                                    onPress: () => goYoutube(item.link),
                                }}
                            />
                        </>
                    ))}
                </ScrollView>
            </GestureRecognizer>
        </>
    );
}
