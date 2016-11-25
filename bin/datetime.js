var moment = require('moment-timezone');
var configApp = require('../config/app');

moment.locale('id');

module.exports = {
    now: (format) => {
        if (format) return moment().tz(configApp.timezone).format('LLLL');
        else return moment().tz(configApp.timezone).format();
    },
    full: (datetime) => {
        return moment(datetime, configApp.timezone).format('LLLL');
    }
};