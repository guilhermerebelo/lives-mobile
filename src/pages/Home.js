import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import GestureRecognizer, {
    swipeDirections,
} from "react-native-swipe-gestures";

import Axios from "axios";
import moment from "moment/min/moment-with-locales";
moment.locale("pt-BR");

let DAY = moment().format("YYYY-MM-DD");
let lives = {};

import { Header, ListItem, Icon } from "react-native-elements";

export default function Home() {
    let [liveToday, setLiveToday] = useState([]);

    useEffect(() => {
        loadStart();
    }, []);

    function before() {
        DAY = moment(DAY).subtract(1, "day").format("YYYY-MM-DD");

        if (!lives.data[DAY]) {
            return;
        }

        setLiveToday(lives.data[DAY].lives);
    }

    function after() {
        DAY = moment(DAY).add(1, "day").format("YYYY-MM-DD");

        if (!lives.data[DAY]) {
            return;
        }

        setLiveToday(lives.data[DAY].lives);
    }

    async function loadStart() {
        lives = await Axios.get(
            "https://raw.githubusercontent.com/guilhermerebelo/json/master/file.json"
        );

        setLiveToday(content.data[DAY].lives);
    }

    function getDay() {
        return moment(DAY).format("dddd").toUpperCase();
    }

    return (
        <>
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
                    text: `LIVES ${getDay()} ${moment(DAY).format("DD/MM")}`,
                    style: { color: "#fff" },
                }}
            />

            <ScrollView>
                {liveToday.map((item, index) => (
                    <ListItem
                        key={index}
                        title={`${item.horario} - ${item.description}`}
                        bottomDivider
                        rightIcon={{
                            name: "youtube",
                            type: "antdesign",
                            color: "#FF0000",
                        }}
                        leftIcon={{
                            name: "clock",
                            type: "feather",
                            color: "black",
                        }}
                    />
                ))}
            </ScrollView>
        </>
    );
}
