import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import Chart from 'chart.js';
import { first } from 'rxjs/operators';
import { MachineMasterService } from '../_services/machine-master.service';
import { FurnacedashService } from '../_services';
import * as Highcharts from 'highcharts';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);
import solidGauge from 'highcharts/modules/solid-gauge.src';
solidGauge(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
@Component({
  selector: 'app-meterhistory',
  templateUrl: './meterhistory.component.html',
  styleUrls: ['./meterhistory.component.css']
})
export class MeterhistoryComponent implements OnInit {
  public datasets                   : any;
  public data                       : any;
  public voltage        : any;
  public current        : any;
  public pf             : any;
  public kwhr           : any;
  public power          : any;
  public salesChart;
  dateValue                         = new Date();
  dateValue1                        = new Date();
  public id ;
  public univarsalDateFormat        = 'yyyy-MM-dd HH:mm:ss';
  public meter_data               = [];
  public machineno                = '';
  public MachineData;
  dtOptions                         : any = {};
  objectKeys = Object.keys;
  public prm_name ='';
  public chartoption = {};
  public datalabels;
 public colors = ['#5793f3', '#d14a61', '#675bba','#6ab04c','#f9ca24'];
voltageArray                          = [];
currentArray                          = [];
pfArray                               = [];   
kwhtargeted                           = [];
 public kwhArray_cmp1                  = [];
public targeted_kwh                   = [];
public hours_cmp1                     = [];
public kwhDiffArray_cmp1              = [];
public CurrentAvg_cmp1                = [];
public voltageAvg_cmp1                = [];
public realPowerAvg_cmp1              = [];  
public apparentPowerAvg_cmp1          = [];
public targeted_kwh_cmp1              = [];
public smartData_cmp1                 = [];     
kwh_value_em1_avg_cmp1;
public kwhArray_cmp2                  = [];
public hours_cmp2                     = [];
public kwhDiffArray_cmp2              = [];
public CurrentAvg_cmp2                = [];
public voltageAvg_cmp2                = [];
public realPowerAvg_cmp2              = [];  
public apparentPowerAvg_cmp2          = [];
public targeted_kwh_cmp2              = [];
public smartData_cmp2                 = [];   
public diffKwConsumption              = [];  
public diffKwConsumption_cmp1         = []; 
public diffKwConsumption_cmp2         = [];
highcharts;
highcharts_cmp1;
highcharts_cmp2;
highcharts4;
chartOptions;
chartOptions4;
chartOptions_cmp1;
chartOptions_cmp2; 
  constructor(private datepipe: DatePipe,private MachineMasterService: MachineMasterService,private MeterHistory:FurnacedashService) { }

  ngOnInit(): void {
    this.retrieveMachine();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      buttons: ['copy', 'print', 'csv','colvis','pdf','excel']
    };
  }
  retrieveMachine(): void {

    this.MachineMasterService.getAll()
      .subscribe(
        machinedata => {
          this.MachineData=machinedata;
          this.machineno= '';
        },
        error => {
          console.log(error);
        });
  }
  showData()
  {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      buttons: ['copy', 'print', 'csv','colvis','pdf','excel']
    };
    this.meter_data    = []; 
    this.datalabels    = []; 
    this.data          = [];
    this.voltage       = [];
    this.current       = [];
    this.pf            = [];
    this.kwhr          = []; 
    this.power         = [];    
    var fDate                     = this.dateValue.toISOString();
    var tDate                     = this.dateValue1.toISOString();
    console.log(this.machineno)
    const data = {
      machineno             : this.machineno,
      start_date            : fDate,
      end_date              : tDate      
    };
    this.MeterHistory.getmeterdata(data)    
    .pipe(first())
    .subscribe(mqttda => {
            this.meter_data = mqttda;
            for (let index = 0; index < this.meter_data.length; index++) {
             let row=this.meter_data[index];
             this.datalabels.push(this.datepipe.transform(this.meter_data[index].timestamp, 'dd-MM-yy HH:mm:ss'));
             this.voltage.push(row['Voltage']);
             this.current.push(row['Current']);
             this.pf.push(row['Pf']);
             this.kwhr.push(row['Kwhr']); 
             this.power.push(row['Power']); 
            }
            this.highcharts   = Highcharts;
            this.chartOptions = {
              chart: {
                zoomType: 'x'
               
                },
              credits: { enabled: false },
              legend: {

              },
              title: {
                text: '',
                style: {
                  
                  fontSize: 15
                }
              },
              xAxis: {
                categories: this.datalabels,
                labels: {
                  style: {
                   
                  }
                }
              },
              tooltip: {
                shared: true
            },      
            yAxis: [
                {
                  lineWidth: 1,
                  opposite: false,
                  title: {
                      text: 'Voltage',
                      
                  },
                  labels: {
                    style: {
                    
                      fontSize: 10
                    }
                  },
            },
            {
              // max:2500000,
              lineWidth: 1,
              opposite: false,
              title: {
                  text: 'Current'                
              },
              labels: {
                style: {
                  fontSize: 10
                }
              },
            }
            ,
            {
              // max:2500000,
              lineWidth: 1,
              opposite: true,
              title: {
                  text: 'Pf'                
              },
              labels: {
                style: {
                  fontSize: 10
                }
              },
            }          
            ,
            {
              // max:2500000,
              lineWidth: 1,
              opposite: true,
              title: {
                  text: 'Kwhr'                
              },
              labels: {
                style: {
                  fontSize: 10
                }
              },
            },
            {
              // max:2500000,
              lineWidth: 1,
              opposite: true,
              title: {
                  text: 'Power'                
              },
              labels: {
                style: {
                  fontSize: 10
                }
              },
            }          
          ],
            labels: {
                items: [{
                    html: '',
                    style: {
                      fontSize: 15
                    }
                }]
            },
            
            series: [ 
              {
                type: 'spline',
                name: 'Voltage',
                data: this.voltage,
                yAxis: 1,
                
                tooltip: {
                  valueSuffix: ' V'
                }
              },{
                type: 'spline',
                name: 'Current',
                color:'#EA4335',
                data: this.current,
                yAxis: 2,
                tooltip: {
                  valueSuffix: ' A'
                }
              },
              {
                type: 'spline',
                name: 'Pf',
                data: this.pf,
                zIndex: 5,
                lineWidth: 2,
                yAxis: 2,
                marker: {
                  lineWidth: 2,
                  //lineColor: '#A2F3EF',
                  //fillColor: 'green'
                },
                tooltip: {
                  valueSuffix: ' pf'
                }
              },
              {
                type: 'spline',
                name: 'Power',
                data: this.power,
                zIndex: 5,
                lineWidth: 2,
                yAxis: 2,
                marker: {
                  lineWidth: 2,
                 // lineColor: '#A2F3EF',
                 // fillColor: 'green'
                },
                tooltip: {
                  valueSuffix: ' kw'
                }
              },
              {
                type: 'spline',
                name: 'Kwhr',
                data: this.kwhr,
                zIndex: 5,
                lineWidth: 2,
                yAxis: 2,
                marker: {
                  lineWidth: 2,
                  //lineColor: '#A2F3EF',
                 // fillColor: 'green'
                },
                tooltip: {
                  valueSuffix: ' kwhr'
                }
              }
          ]
          };


    });
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true
      };
  }

  
}
