const cal = new CalHeatmap();

cal.paint(
    {
        itemSelector: document.getElementById('cal-heatmap'),
        //or itemSelector: document.getElementById('cal-heatmap'),

        domain: {
            type: 'month',
            gutter: 0,
            label: {
                text: 'MMM', 
                textAlign: 'start', 
                position: 'top' 
            }
        },
        subDomain: {
            type:'ghDay',
            gutter:5,
            width:17,
            height:17,
            radius:3,
            label:null
        },
        date: {
            start: new Date('2023-01-01')
        },
        data: {
            source: 'data.json',
            x: 'date',
            y: 'count'
        },
        scale: {
            color: {
                type: 'threshold',
                range: ['#b0f5e5', '#35f2c6', '#0fbdb4', '#077485'],
                domain: [4, 6, 8]
            }
        }
    }
);