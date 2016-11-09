'use strict'
var fs = require("fs"),
    request = require("request"),
    cheerio = require("cheerio"),
    url = 'http://metro.dp.ua/timetable.html'

function getTimeTable(data) {
    var $ = cheerio.load(data);
    var timeTable = {
      vokzalna: {},
      pokrovska: {}
    };
    timeTable.vokzalna.workday = getTimes($("p:has(a[name='workday-vokzalnaya-to-kommunar']) + table p"));
    timeTable.vokzalna.weekend = getTimes($("p:has(a[name='weekend-vokzalnaya-to-kommunar']) + table p"));
    timeTable.pokrovska.workday = getTimes($("p:has(a[name='workday-kommunar-to-vokzalnaya']) + table p"));
    timeTable.pokrovska.weekend = getTimes($("p:has(a[name='weekend-kommunar-to-vokzalnaya']) + table p"));    
    return timeTable;
}

function getTimes(data) {
    var time = [];
    data.each((i) => {
        var text = data.eq(i).text();
        if (text !== '\u00A0') {
            time.push(text);
        }
    })
    return time.map((x) => leftPad(x, 5, '0')).sort();
}

function leftPad(str, length, char) {
    var count = length - str.length;
    var result = str;
    if (count > 0) {
        result = char.repeat(count) + str;
    }
    return result;
}

request(url, (error, response, body) => {
    if (error) throw err;
    var timeTable = getTimeTable(body);
    fs.writeFile('time.json', JSON.stringify(timeTable), (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });
});
