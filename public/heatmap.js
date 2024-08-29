const heatmapData = [
    { date: "2024-08-01", value: 6 },
    { date: "2024-08-02", value: 6 },
  ];
  const now = new Date();
  const cal = new CalHeatmap();
  const domain = {
    type: 'month',
    gutter: 2,
    padding: [0, 0, 0, 0],
    label: {
      text: 'MM月',
      position: 'top',
      textAlign: 'middle',
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
   start: new Date(now.getFullYear(), now.getMonth() - 10),
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
  
  // PopperOptions, see https://popper.js.org/docs/v2/constructors/#options
  const TOOLTIP_OPTIONS = {
    enabled: true,
    text: (_, value, dayjsDate) => {
      return `${value ?? 0} 回のあいさつ ${dayjs(dayjsDate).format('YYYY/MM/DD')}`;
    }
  };
  cal.paint(options,[[Tooltip, TOOLTIP_OPTIONS]], [
    [
      LegendLite,
      {
        gutter: 10,
        itemSelector: '#legend-gutter',
      },
    ],
  ]);