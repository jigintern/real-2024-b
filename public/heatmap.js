let data1 = '2024-06-01';
    String(data1);
const data = [
    { date: data1, count: 6 },
    { date: '2023-11-02', count: 6 },
  ];
const cal = new CalHeatmap();
const now = new Date();
cal.paint(
    {
        itemSelector: document.getElementById('cal-heatmap'),
        //or itemSelector: document.getElementById('cal-heatmap'),

        domain: { type: 'month', gutter: 2 },
        subDomain: { type: 'ghDay', label: 'DD', width: 30, height: 30 },
        domainLabelFormat: '%Y-%m',
        date: {
            
            start: new Date(now.getFullYear(), now.getMonth() - 11),
        },
        data: {
            source: data,
            x: 'date',
            y: 'count'
        },
        scale: {
            color: {
                // Try some values: Purples, Blues, Turbo, Magma, etc ...
                scheme: 'Greens',
                type: 'linear',
                domain: [0, 30],
              },
            },
          },
);