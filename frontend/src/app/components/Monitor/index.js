import React, { Component } from 'react';
import { getMonitor } from '../../actions/monitor';
import { connect } from 'react-redux';
//import { containerChart} from './styles';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
//import HC_more from "highcharts/highcharts-more"; //module
//HC_more(Highcharts); //init module


class Monitor extends Component {
    constructor(props){
        super(props);

        this.allowChartUpdate = true;
        this.state = {};
        
    }
    componentDidMount() {
        console.log('componentDidMount')
        this.props.getMonitor({id:0})
    }
    render() {
        console.log('render')
        const { newHost } = this.props;

          try {        
            console.log(this)
            this.chartData = newHost.results.map(result => [ Date.UTC(new Date(result["monitorDate"]).getTime()), result["timeResponse"] ,result["status"], result["statusCod"], result["url"] ]);
            this.chartName = newHost.name;
            }
          catch(err) {
            console.log('aguardando props');
          }
       

       const options = {
            series: [{
                type: 'area',
                name: this.chartName,
                data: this.chartData,
               
            }],
            chart: {
              zoomType: 'x',
              spacingLeft: 30,
              spacingRight: 30,
              events: {
                render: function(e) {
                    console.log('load', e)
                    if (this.allowChartUpdate) {
                        this.allowChartUpdate = false;
                    }
                        this.allowChartUpdate = true;    
                    }
                }  
            },
            
            tooltip: {
                
                formatter: function(){
                       return `<span style="font-size:10px"><b>${this.series.name}</b></span><br/>
                                <span style="font-size:10px">${this.point.url}</span><br/> 
                                <span style="font-size:10px">Status: 
                                ${(this.point.statusCod < 200 || this.point.statusCod >= 400) ? '<span style="color:red">' : '<span>'}
                                ${this.point.status}</span><br/>
                                <span style="font-size:12px">Tempo de resposta: <b>${this.point.y}</b>ms</span>`    
                },  
                useHTML: true
            },
            subtitle: {
                text: document.ontouchstart === undefined ?
                    'Clique e arraste na área de plotagem para ampliar':'Clique no grafico para amplias'
            },
            time: {useUTC: false},
            xAxis: {
                type: 'datetime',
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
                    keys: ['date', 'y', 'status', 'statusCod','url'], // 4th data position as custom property
                    stacking: 'normal'
                }
            },
    }
        //console.log({monitor})
        return (
            <HighchartsReact
            ref={"chartComponent"}
            allowChartUpdate={this.allowChartUpdate}
            highcharts={Highcharts}
            options={ options }
          />

        )
    }
}

const mapStateToProps = function({newHost}){ 
    return {newHost}
};
const mapDispatchToProps = dispatch => {
    return {
        getMonitor: (newHost) => dispatch(getMonitor(newHost))
    };
}

const MonitorContainer = connect(mapStateToProps, mapDispatchToProps)(Monitor);
export default MonitorContainer;