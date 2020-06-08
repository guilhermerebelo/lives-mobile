const URL_GIT =
    "https://raw.githubusercontent.com/guilhermerebelo/json/master/file.json";
const LOCAL_DATE = "YYYY-MM-DD";

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Axios from "axios";

import moment from "moment/min/moment-with-locales";
moment.locale("pt-BR");

export default function Home() {
    let [liveToday, setLiveToday] = useState();

    const navigation = useNavigation();

    useEffect(() => {
        if (!liveToday) {
            loadStart();
            return;
        }

        navigation.navigate("Home", objectTransition());
    }, [liveToday]);

    function objectTransition() {
        return {
            lives: liveToday,
            date: moment().format(LOCAL_DATE),
        };
    }

    async function loadStart() {
        let response = await Axios.get(URL_GIT);
        setLiveToday(response.data);
    }

    return <></>;
}
