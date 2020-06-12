const URL_GIT =
    "https://raw.githubusercontent.com/guilhermerebelo/json/master/file.json";
const LOCAL_DATE = "YYYY-MM-DD";

import * as Linking from "expo-linking";

import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { useNavigation } from "@react-navigation/native";

import Axios from "axios";
import moment from "moment/min/moment-with-locales";
moment.locale("pt-BR");

let DAY = moment().format(LOCAL_DATE);

import data from "./Helper";
let lives = { data };

import { Header, ListItem, Icon } from "react-native-elements";

export default function Home() {
    let [liveToday, setLiveToday] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        loadStart();
    }, []);

    function viewDetails(item) {
        navigation.navigate("Detail", item);
    }

    function before() {
        DAY = moment(DAY).subtract(1, "day").format(LOCAL_DATE);

        if (!lives.data[DAY]) {
            return;
        }

        setLiveToday(lives.data[DAY].lives);
    }

    function after() {
        DAY = moment(DAY).add(1, "day").format(LOCAL_DATE);

        if (!lives.data[DAY]) {
            return;
        }

        setLiveToday(lives.data[DAY].lives);
    }

    function goYoutube(url) {
        Linking.openURL(url);
    }

    async function loadStart() {
        // lives = await Axios.get(URL_GIT);
        setLiveToday(lives.data[DAY].lives);
    }

    function getDay() {
        return moment(DAY).format("dddd").toUpperCase();
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
                        text: `LIVES ${getDay()} ${moment(DAY).format(
                            "DD/MM"
                        )}`,
                        style: { color: "#fff" },
                    }}
                />

                <ScrollView>
                    {liveToday.map((item, index) => (
                        <ListItem
                            key={index}
                            title={`${item.horario} - ${item.description}`}
                            bottomDivider
                            chevron={{ onPress: () => viewDetails(item) }}
                            rightIcon={{
                                name: "bell-off",
                                type: "feather",
                            }}
                        />
                    ))}
                    <View style={{ height: 30 }}></View>
                </ScrollView>
            </GestureRecognizer>
        </>
    );
}
