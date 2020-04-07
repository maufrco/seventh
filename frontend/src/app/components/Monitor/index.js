import React, { useEffect } from 'react';
import { actions } from '../../actions/monitor';
import { useDispatch, useSelector } from "react-redux";
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {selectors} from '../utils/selectors'


const Monitor = () => {

    const dispatch = useDispatch();
    const host = useSelector(selectors.monitor)

    useEffect(() => dispatch(actions.getMonitor({id: 0})),[] );
    
    let chartData;
    let chartName;
    let allowChartUpdate = true;

    try {        
        chartData = host.results.map(result => [ new Date(result["monitorDate"]).getTime(), result["timeResponse"] ,result["status"], result["statusCod"], result["url"] ]);
        chartName = host.name;
    }
    catch(err) {
        console.log('aguardando props');
    }
       
    const options = {
            series: [{
                type: 'area',
                name: chartName,
                data: chartData,
                tooltip:{
                    dateTimeLabelFormats:{
                        hour: "%A, %b %e, %H:%M",
                        day: "%A, %b %e, %H:%M"
                    }
                }
               
            }],
            chart: {
              zoomType: 'x',
              spacingLeft: 30,
              spacingRight: 30,
           
            },
            
            tooltip: {
                
                formatter: function(){
                       return `<span style="font-size:10px"><b>${this.series.name}</b></span> <i><span style="font-size:10px">${new Date(this.point.x).toLocaleDateString('pt-BR')} ${new Date(this.point.x).toLocaleTimeString('pt-BR')}</span></i><br/> 
                                <span style="font-size:10px">${this.point.url}</span><br/> 
                                <span style="font-size:10px">Status: 
                                ${(this.point.statusCod < 200 || this.point.statusCod >= 400) ? '<span style="color:red">' : '<span>'}
                                ${this.point.status}</span><br/>
                                <span style="font-size:12px">Tempo de resposta: <b>${this.point.y}</b>ms</span>`    
                },  
                useHTML: true
            },
            rangeSelector: {
                allButtonsEnabled: true,
                buttons: [{
                    type: 'month',
                    count: 3,
                    text: 'Day',
                    dataGrouping: {
                        forced: true,
                        units: [['day', [1]]]
                    }
                }, {
                    type: 'year',
                    count: 1,
                    text: 'Week',
                    dataGrouping: {
                        forced: true,
                        units: [['week', [1]]]
                    }
                }, {
                    type: 'all',
                    text: 'Month',
                    dataGrouping: {
                        forced: true,
                        units: [['month', [1]]]
                    }
                }],
                buttonTheme: {
                    width: 60
                },
                selected: 2
            },
            _navigator: {
                enabled: false
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Clique e arraste na área de plotagem para ampliar':'Clique no grafico para amplias'
            },
            time: {useUTC: true},
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                min: 0,
                labels : { format : '{value:,.0f} ms' },
                title:{ text: 'milisseconds' },          
            },
            credits: {enabled: false},
            title: {
                text: 'Host Monitorados - Tempo de resposta (ms)'
            },
           
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: { radius: 2 },
                    lineWidth: 1,
                    states: { hover: { lineWidth: 1 } },
                    threshold: null
                },
                series: {
                    keys: ['x', 'y', 'status', 'statusCod','url'], // 4th data position as custom property
                    pointIntervalUnit: 'day'}}}
        
        
    return (
        <HighchartsReact
        highcharts={Highcharts} 
        allowChartUpdate={allowChartUpdate}
        highcharts={Highcharts}
        options={ options }
        />

    )
}

export default Monitor;