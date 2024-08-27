let data1 = "2024-06-01";
String(data1);
const heatmapData = [
  { date: data1, value: 6 },
  { date: "2024-08-02", value: 6 },
];
const cal = new CalHeatmap();
const domain = {
  type: 'month',
  gutter: 2,
  padding: [0, 0, 0, 0],
  label: {
    text: 'M月',
    position: 'top',
    textAlign: 'start',
    offset: {
      x: 0,
      y: 0
    },
    rotate: null,
  },
  sort: 'asc'
}

const subDomain = {
 type: 'ghDay',
 gutter: 2,
 width: 11,
 height: 11,
 radius: 2,
 label: null
};

const date = {
 start: new Date(),
 highlight: [new Date()],
 locale: 'ja',
 timezone: 'Asia/Tokyo'
};

const data = {
source: heatmapData,
x: 'date',
y: (d) => +d['value'],
defaultValue: null
};

const scale = {
color: {
 range: ['#e6e6e6', '#4dd05a'],
 domain: [1],
 type: 'threshold',
}
};

const options = {
itemSelector: '#cal-heatmap',
domain,
subDomain,
date,
data,
scale
};

cal.paint(options,{
  enabled: true,
  text: (_, value, dayjsDate) => {
    return `${value ?? 0} 件の投稿 ${dayjs(dayjsDate).format('YYYY/MM/DD')}`;
  }});