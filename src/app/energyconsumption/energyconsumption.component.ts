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
@Component({
  selector: 'app-energyconsumption',
  templateUrl: './energyconsumption.component.html',
  styleUrls: ['./energyconsumption.component.css']
})
export class EnergyconsumptionComponent implements OnInit {
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
  public meter_data               = [];
  public machineno                  = 1;
  public MachineData;
  dtOptions                         : DataTables.Settings = {};
  objectKeys = Object.keys;
  public prm_name ='em1';
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
  }
  onParamChange($event)
  {

  }
  retrieveMachine(): void {
    this.MachineMasterService.getAll()
      .subscribe(
        machinedata => {
          this.MachineData=machinedata;
          this.machineno= this.MachineData[0]['friendly_name'];
        },
        error => {
          console.log(error);
        });
  }
  showData()
  {
  }
}
