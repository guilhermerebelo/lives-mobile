const URL_GIT = "https://raw.githubusercontent.com/guilhermerebelo/json/master/file.json";
const LOCAL_DATE = "YYYY-MM-DD";

import moment from "moment/min/moment-with-locales";
import axios from "axios";

moment.locale("pt-BR");

export default {
    // request
    axios,
    listAll: () => axios.get(URL_GIT),

    // moment
    moment,
    getDay: () => moment().format(LOCAL_DATE),
    subtractDay: (day) => moment(day).subtract(1, "day").format(LOCAL_DATE),
    addDay: (day) => moment(day).add(1, "day").format(LOCAL_DATE),
    format: (day, format) => moment(day).format(format)
}