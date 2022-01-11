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

@Component({
  selector: 'app-energyconsumptionhourly',
  templateUrl: './energyconsumptionhourly.component.html',
  styleUrls: ['./energyconsumptionhourly.component.css']
})
export class EnergyconsumptionhourlyComponent implements OnInit {
  public datasets                   : any;
  public data                       : any;
  public voltage        : any;
  public current        : any;
  public pf             : any;
  public kwhr           : any;
  public power          : any;
  public salesChart;
  public type           = 1;
  dateValue                         = new Date();
  dateValue1                        = new Date();
  public id ;
  public univarsalDateFormat        = 'yyyy-MM-dd HH:mm:ss';
  public meter_data                 = [];
  public machineno                  = "";
  public MachineData;
  public headers;
  public mtype                       =false;
  dtOptions                         : any = {};
  objectKeys = Object.keys;
  public prm_name ='em1';
  public chartoption = {};
  public datalabels;
  public colors = ['#5793f3', '#d14a61', '#675bba','#6ab04c','#f9ca24'];
voltageArray                          = [];
currentArray                          = [];
pfArray                               = [];   
kwhtargeted                           = [];
public BatchData;
public batchDetail;
public batchSummary;
 public kwhArray_cmp1                 = [];
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
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        processing: true,
        buttons: ['copy', 'print', 'csv','colvis','pdf','excel']
    };
    this.retrieveMachine();
  }
  onParamChange($event)
  {

  }
  retrieveMachine(): void {

    this.MachineMasterService.getAll()
      .subscribe(
        machinedata => {
          this.MachineData=machinedata;
          this.machineno= "";
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
    this.headers       = []; 
    this.datalabels    = []; 
    this.data          = [];
    this.voltage       = [];
    this.current       = [];
    this.pf            = [];
    this.kwhr          = []; 
    this.power         = []; 
    this.batchDetail = [];
    this.batchSummary = [];
    var fDate                     = this.dateValue.toISOString();
    var tDate                     = this.dateValue1.toISOString();
    const data = {
      machineno          : this.machineno,
      start_date         : fDate,
      end_date           : tDate
    };
    if(this.machineno=="All"){
      this.mtype=true;
      this.headers.push("Date")
      for (let index = 0; index < this.MachineData.length; index++) {
        const element = this.MachineData[index].machine_name;
        this.headers.push(element);
      }

    }
    else
    {
      this.mtype=false;
      this.headers.push("Date")
      for (let index = 0; index < this.MachineData.length; index++) {
        const element = this.MachineData[index].machine_name;
        const element1 = this.MachineData[index].friendly_name;
        if(this.machineno==element1)
        {
          this.headers.push(element)
        }
      }
    }
    console.log(this.headers);
    this.MeterHistory.getenergyconsumptionhourly(data)
    .subscribe(
      machinedata => {       
        this.batchDetail=machinedata;
      })
  }
}
