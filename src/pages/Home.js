import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { useNavigation } from "@react-navigation/native";
import { Header, ListItem, Icon } from "react-native-elements";

import $commons from "./Commons";

export default function Home() {
    let lives = {};
    let day = $commons.getDay();

    let [liveToday, setLiveToday] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        loadStart();
    }, []);

    function viewDetails(item) {
        navigation.navigate("Detail", item);
    }

    function before() {
        day = $commons.subtractDay(day);

        if (!lives.data[day]) {
            return;
        }

        setLiveToday(lives.data[day].lives);
    }

    function after() {
        day = $commons.add(day);

        if (!lives.data[day]) {
            return;
        }

        setLiveToday(lives.data[day].lives);
    }

    async function loadStart() {
        lives = await $commons.listAll();
        setLiveToday(lives.data[day].lives);
    }

    function getDay() {
        return $commons.format(day, 'dddd').toUpperCase();
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
                        text: `LIVES ${getDay()} ${$commons.format(day, "DD/MM")}`,
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
