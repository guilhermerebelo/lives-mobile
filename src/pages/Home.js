import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { useNavigation } from "@react-navigation/native";
import { Header, ListItem, Icon } from "react-native-elements";

import $commons from "./commons";

import Logo from "../../assets/icon.png"

let lives = {};
let day = $commons.getDay();

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
        day = $commons.subtractDay(day);

        if (!lives.data[day]) {
            return;
        }

        setLiveToday(lives.data[day].lives);
    }

    function after() {
        day = $commons.addDay(day);

        if (!lives.data[day]) {
            return;
        }

        setLiveToday(lives.data[day].lives);
    }

    function loadStart() {
        lives = $commons.listAll();
        setLiveToday(lives.data[day].lives);
    }

    function getDay() {
        return $commons.format(day, 'dddd').toUpperCase();
    }

    const LeftComponenttHeader = () => {
        return (
            <Icon size={40} color="#fff" name="chevron-left" type="entypo" onPress={before} />
        )
    }

    const RightComponenttHeader = () => {
        return (
            <Icon size={40} color="#fff" name="chevron-right" type="entypo" onPress={after} />
        )
    }

    const CenterComponentHeader = () => {
        return (
            <Image
                style={{ width: 160, height: 160 }}
                source={Logo}
            />
        )
    }

    return (
        <>
            <ScrollView>
                {/* <GestureRecognizer onSwipeLeft={after} onSwipeRight={before}> */}
                <Header
                    leftComponent={<LeftComponenttHeader />}
                    rightComponent={<RightComponenttHeader />}
                    centerComponent={<CenterComponentHeader />}
                    linearGradientProps={{
                        colors: ['#e9a514', '#f4c96d'],
                        start: { x: 0.5, y: 0.5 },
                        end: { x: 1, y: 1 },
                    }}
                />

                <Text style={{ textAlign: "center", marginTop: 15, marginBottom: 5, fontSize: 18, color: "#575757" }}>
                    {`${$commons.format(day, "DD/MM")} - ${getDay()}`}
                </Text>


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
                {/* </GestureRecognizer> */}
            </ScrollView>
        </>
    );
}
