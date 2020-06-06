import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";

import Axios from "axios";
import moment from "moment";

const DAY = moment().format("YYYY-MM-DD");
let content = {};

import { Header, ListItem, Icon } from "react-native-elements";

export default function Home() {
    let [liveToday, setLiveToday] = useState([]);

    useEffect(loadStart, []);

    function before() {
        setLiveToday(content.data[DAY].lives);
    }

    function after() {
        let content = setLiveToday(content.data[DAY].lives);
    }

    async function loadStart() {
        let content = await Axios.get(
            "https://raw.githubusercontent.com/guilhermerebelo/json/master/file.json"
        );

        setLiveToday(content.data["2020-06-01"].lives);
    }

    return (
        <>
            <Header
                containerStyle={{ backgroundColor: "#af2b2b" }}
                leftComponent={{
                    icon: "left",
                    color: "#fff",
                    type: "antdesign",
                }}
                rightComponent={{
                    icon: "right",
                    color: "#fff",
                    type: "antdesign",
                }}
                centerComponent={{
                    text: "LIVES SEG 14/05",
                    style: { color: "#fff" },
                }}
            />

            <ScrollView>
                {liveToday.map((item, index) => (
                    <ListItem
                        key={index}
                        title={item.description}
                        bottomDivider
                        rightIcon={{
                            name: "youtube",
                            type: "antdesign",
                            color: "#FF0000",
                        }}
                        leftIcon={{
                            name: "star-outlined",
                            type: "entypo",
                            color: "black",
                        }}
                    />
                ))}
            </ScrollView>

            <View style={styles.footer}>
                <View
                    style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                    }}
                >
                    <View style={{ paddingTop: 12, height: 50, width: "25%" }}>
                        <Icon type="fontisto" name="home" color="#78828F" />
                    </View>
                    <View style={{ paddingTop: 12, height: 50, width: "25%" }}>
                        {/* <Icon type="fontisto" name="dollar" color="#78828F" /> */}
                    </View>
                    <View style={{ paddingTop: 12, height: 50, width: "25%" }}>
                        {/* <Icon type="fontisto" name="fire" color="#78828F" /> */}
                    </View>
                    <View style={{ paddingTop: 12, height: 50, width: "25%" }}>
                        {/* <Icon type="fontisto" name="person" color="#78828F" /> */}
                    </View>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    footer: {
        position: "absolute",
        bottom: 0,
        height: 50,
        width: "100%",
        backgroundColor: "#F9F9F9",
    },
});
