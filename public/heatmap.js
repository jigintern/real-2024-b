var datas = {
    "1630370800" : 1, // 2018/07/01
    "1530457200" : 3, // 2018/07/02
    "1533049200" : 5, // 2018/08/01
    "1533135600" : 7, // 2018/08/02
    "1546268400" : 10 // 2019/01/01
};
let day = Date.now();
console.log(day);
var cal = new CalHeatMap();
var now = new Date();
cal.init({
    itemSelector: '#sample-heatmap',
    domain: "month",
    data: datas,
    domainLabelFormat: '%Y-%m',
    start: new Date(now.getFullYear(), now.getMonth() - 11),
    cellSize: 10,
    range: 12,
    legend: [1, 3, 5, 7, 10],
});