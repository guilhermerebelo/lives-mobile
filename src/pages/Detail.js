import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, AsyncStorage } from "react-native";
import { Card, Header, Icon } from "react-native-elements";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";

import $commons from "./commons";

import Logo from "../../assets/icon.png"

const TIPO_AVISO = {
    false: {
        mensagem: "ME AVISE QUANDO COMEÇAR",
        icon: () => <Icon size={35} name="bell-off" type="feather" />,
    },
    true: {
        mensagem: "VOCÊ SERA NOTIFICADO",
        icon: () => <Icon size={35} name="bell" type="feather" />,
    },
};

export default function Detail({ route }) {
    const { params } = route;
    const navigation = useNavigation();
    const slote = `${params.dia}-${params.description}`

    let [aviso, setAviso] = useState(false);

    useEffect(() => {
        getItem(slote, (aviso) => setAviso(aviso || false))
    }, [])

    function backRouter() {
        navigation.navigate("Home");
    }

    function saveLive() {
        if (aviso) {
            AsyncStorage.removeItem(slote, () => {
                setAviso(!aviso)
            })
        } else {
            AsyncStorage.setItem(slote, !aviso, () => {
                setAviso(!aviso)
            })
        }
    }

    async function getItem() {
        return await AsyncStorage.getItem(slote)
    }

    function goYoutube(url) {
        Linking.openURL(url);
    }

    const LeftComponenttHeader = () => {
        return (
            <Icon size={40} color="#fff" name="chevron-left" type="entypo" onPress={backRouter} />
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
            <Header
                leftComponent={<LeftComponenttHeader />}
                centerComponent={<CenterComponentHeader />}
                linearGradientProps={{
                    colors: ['#e9a514', '#f4c96d'],
                    start: { x: 0.5, y: 0.5 },
                    end: { x: 1, y: 1 },
                }}
            />

            <Card containerStyle={{ paddingTop: 30, paddingBottom: 30 }}>
                <View style={{ alignItems: "center", flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Icon
                            size={35}
                            style={{ width: "85%", fontSize: 18 }}
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
                            {$commons.format(params.dia, "dddd").toUpperCase()}
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
                    <Text style={{ flex: 2 }}>CLIQUE PARA ASSISTIR</Text>
                </TouchableOpacity>
            </Card>

            <Card containerStyle={{ paddingTop: 30, paddingBottom: 30 }}>
                <TouchableOpacity
                    onPress={() => saveLive()}
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