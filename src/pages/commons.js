const URL_GIT = "https://raw.githubusercontent.com/guilhermerebelo/json/master/file.json";
const LOCAL_DATE = "YYYY-MM-DD";

const color = "#ecb84a";

import moment from "moment/min/moment-with-locales";
import axios from "axios";
import data from "./helper";

moment.locale("pt-BR");

export default {
    // request
    axios,
    listAll: () => { return { data } },

    // moment
    moment,
    // getDay: () => moment().format(LOCAL_DATE),
    getDay: () => '2020-06-16',
    subtractDay: (day) => moment(day).subtract(1, "day").format(LOCAL_DATE),
    addDay: (day) => moment(day).add(1, "day").format(LOCAL_DATE),
    format: (day, format) => moment(day).format(format),

    color
}