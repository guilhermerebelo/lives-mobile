import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Card, Header, Icon } from "react-native-elements";

import * as Linking from "expo-linking";

import Style from "./Style";

import moment from "moment/min/moment-with-locales";
moment.locale("pt-BR");

import { useNavigation } from "@react-navigation/native";

const TIPO_AVISO = {
    false: {
        mensagem: "Me avise quando começar",
        icon: () => <Icon size={35} name="bell-off" type="feather" />,
    },
    true: {
        mensagem: "Voce será notificado",
        icon: () => <Icon size={35} name="bell" type="feather" />,
    },
};

export default function Detail({ route }) {
    let [aviso, setAviso] = useState(false);

    const { params } = route;

    const navigation = useNavigation();

    function backRouter() {
        navigation.navigate("Home");
    }

    function getDay(day) {
        return moment(day).format("dddd").toUpperCase();
    }

    function changeAviso() {
        setAviso((aviso = !aviso));
        console.log(aviso);
    }

    function goYoutube(url) {
        Linking.openURL(url);
    }

    return (
        <>
            <Header
                containerStyle={{ backgroundColor: "#af2b2b" }}
                leftComponent={{
                    icon: "left",
                    color: "#fff",
                    type: "antdesign",
                    onPress: backRouter,
                }}
                centerComponent={{
                    text: "DADOS DA LIVE",
                    style: { color: "#fff" },
                }}
            />

            <Card containerStyle={{ paddingTop: 30, paddingBottom: 30 }}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Icon
                            size={35}
                            style={Style.iconBoxPosistionDetail}
                            type="material-community"
                            name="artist"
                        />
                    </View>
                    <Text style={{ flex: 5, fontSize: 18 }}>
                        {params.description}
                    </Text>
                </View>
            </Card>

            <Card containerStyle={{ paddingTop: 30, paddingBottom: 30 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Icon size={23} name="access-time" />
                        </View>
                        <Text
                            style={{ flex: 2, fontSize: 17 }}
                        >{`${params.horario}`}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flex: 1,
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <Icon
                                size={20}
                                type="font-awesome-5"
                                name="calendar-day"
                            />
                        </View>
                        <Text style={{ flex: 4, fontSize: 15 }}>
                            {getDay(params.dia)}
                        </Text>
                    </View>
                </View>
            </Card>

            <Card containerStyle={{ paddingTop: 30, paddingBottom: 30 }}>
                <TouchableOpacity
                    onPress={() => goYoutube(params.link)}
                    style={{ alignItems: "center", flexDirection: "row" }}
                >
                    <View style={{ flex: 1 }}>
                        <Icon
                            size={35}
                            name="youtube"
                            type="antdesign"
                            color="#FF0000"
                        />
                    </View>
                    <Text style={{ flex: 2 }}>Clique para assistir</Text>
                </TouchableOpacity>
            </Card>

            <Card containerStyle={{ paddingTop: 30, paddingBottom: 30 }}>
                <TouchableOpacity
                    onPress={() => changeAviso()}
                    style={{ alignItems: "center", flexDirection: "row" }}
                >
                    <View style={{ flex: 1 }}>{TIPO_AVISO[aviso].icon()}</View>
                    <Text style={{ flex: 2 }}>
                        {TIPO_AVISO[aviso].mensagem}
                    </Text>
                </TouchableOpacity>
            </Card>
        </>
    );
}
