import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import Chart from 'chart.js';
import { first } from 'rxjs/operators';
import { MachineMasterService } from '../_services/machine-master.service';
import { FurnacedashService } from '../_services';
@Component({
  selector: 'app-online-data',
  templateUrl: './online-data.component.html',
  styleUrls: ['./online-data.component.css']
})
export class OnlineDataComponent implements OnInit {
  // public voltage        : any;
  // public current        : any;
  // public pf             : any;
  // public kwhr           : any;
  // public power          : any;
  public MachineData;
  public OnlineData;
  constructor(private datepipe: DatePipe,private MachineMasterService: MachineMasterService,private MeterHistory:FurnacedashService) { }

  ngOnInit(): void {
    this.retrieveMachine();
    this.retrieveMeterData();
  }
  retrieveMachine(): void {

    this.MachineMasterService.getAll()
      .subscribe(
        machinedata => {
          this.MachineData=machinedata;
          
        },
        error => {
          console.log(error);
        });
  }
  retrieveMeterData(): void {
    this.OnlineData=[];
    this.MeterHistory.getonlinedata()
      .subscribe(
        machinedata => {
          for (let index = 0; index < this.MachineData.length; index++) {
            const element = this.MachineData[index].friendly_name;
            const machinename = this.MachineData[index].machine_name;
            let voltage=machinedata[0];
            let current;
            let pf;
            let power;
            let kwhr;
            if(index==0)
            {
              voltage=machinedata[0].em1_Voltage;
              current=machinedata[0].em1_current;
              pf=machinedata[0].em1_pf;
              power=machinedata[0].em1_power;
              kwhr=machinedata[0].em1_kwhr;
            }
           else if(index==1)
            {
              voltage=machinedata[0].em2_Voltage;
              current=machinedata[0].em2_current;
              pf=machinedata[0].em2_pf;
              power=machinedata[0].em2_power;
              kwhr=machinedata[0].em2_kwhr;             
            }
            else if(index==2)
            {
              voltage=machinedata[0].em3_Voltage;
              current=machinedata[0].em3_current;
              pf=machinedata[0].em3_pf;
              power=machinedata[0].em3_power;
              kwhr=machinedata[0].em3_kwhr;               
            }
            else if(index==3)
            {
              voltage=machinedata[0].em4_Voltage;
              current=machinedata[0].em4_current;
              pf=machinedata[0].em4_pf;
              power=machinedata[0].em4_power;
              kwhr=machinedata[0].em4_kwhr;                
            }
            else if(index==4)
            {
              voltage=machinedata[0].em5_Voltage;
              current=machinedata[0].em5_current;
              pf=machinedata[0].em5_pf;
              power=machinedata[0].em5_power;
              kwhr=machinedata[0].em5_kwhr;               
            }
            else if(index==5)
            {
              voltage=machinedata[0].em6_Voltage;
              current=machinedata[0].em6_current;
              pf=machinedata[0].em6_pf;
              power=machinedata[0].em6_power;
              kwhr=machinedata[0].em6_kwhr;                
            }
            else if(index==6)
            {
              voltage=machinedata[0].em7_Voltage;
              current=machinedata[0].em7_current;
              pf=machinedata[0].em7_pf;
              power=machinedata[0].em7_power;
              kwhr=machinedata[0].em7_kwhr;                
            }
            else if(index==7)
            {
              
            }
            this.OnlineData.push({"metername":machinename,"voltage":voltage,"current":current,"pf":pf,"power":power,"kwhr":kwhr})
           
          }
          console.log(this.OnlineData)
        },
        error => {
          console.log(error);
        });
  }
}
