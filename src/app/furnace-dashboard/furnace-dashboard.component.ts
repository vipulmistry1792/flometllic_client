import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../_services/notification.service';
import { FurnacedashService,MachineMasterService,ShiftmasterService } from '../_services';
import { first } from 'rxjs/operators';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AccountService } from '../_services';
import { User } from '../_models';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-furnace-dashboard',
  templateUrl: './furnace-dashboard.component.html',
  styleUrls: ['./furnace-dashboard.component.scss']
})
export class FurnaceDashboardComponent implements OnInit {
  public id;
  public timedata           : any;
  public remaintime         = 0;
  public remaintimebool     = false;
  public batchno            = "";
  public Energydata         : any;
  public generaldata        : any;
  public machinename        = 'em1';
  public machineno          = "";
  dateValue                         = new Date();
  dateValue1                        = new Date();
  dateValue2                        = new Date();
  dateValue3                        = new Date();
  public MachineData;
  public location: Location;
  public oprator;
  public shiftData;
  public runningshift;
  public shiftEnergyData;
  public shiftbatch;
  public todaybatch;
  public shiftenergy;
  public todayenergy;
  public todayidealenergy;
  public date;
  user: User;
  constructor(
    private toastr: NotificationService,
    private FurnacedashService: FurnacedashService, 
    private accountService: AccountService,
    private MachineMasterService:MachineMasterService ,
    private ShiftMasterService:ShiftmasterService,
    private datepipe: DatePipe 
  ) { 
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    
   // this.EnergyData();
   if(this.user.user_control!=2)
   {
     this.machinename='em1';
     this.oprator=false;
   }
   else
   {
    this.machinename=this.user.friendly_name;
    this.oprator=true;
   }
   this.retrieveMachine();
   this.retrieverunningshift();
   this.timeData();
    
    this.id =setInterval (()=> {
     // this.EnergyData();
       this.timeData(); 
       this.retrieverunningshift();
       this.retrieveidealenergy();
    }, 1000);
  }
  onParamChange($event)
  {
    //console.log(this.machineno);
    
  } 
  EnergyData(){
    const data = {
      emname             : this.machinename,
      batchno            : this.batchno   
    };
   this.FurnacedashService.getEnergyData(data).subscribe(
      machinedata => {
        this.Energydata=machinedata[0];

     //  console.log(this.Energydata);
      },
      error => {
        console.log(error);
      });
    //console.log(this.machineno);
  } 
  retrieveMachine(): void {

    this.MachineMasterService.getAll()
      .subscribe(
        machinedata => {
          this.MachineData=machinedata;
          if(this.user.user_control!=2)
          {
            this.machinename='em1';
          }
          else
          {
           this.machinename=this.user.friendly_name;
          }
        },
        error => {
          console.log(error);
        });
  }
  timeData(){
    const data = {
      emname             : this.machinename    
    };
   this.FurnacedashService.getTimeData(data).subscribe(
      machinedata => {
        //console.log(machinedata)
        this.timedata=machinedata[0];
        this.remaintime         = parseFloat(this.timedata['stdbatchtime'])-parseFloat(this.timedata['running_time']);
        let rtime=this.remaintime;
        this.batchno=this.timedata['batchno'];
        if(rtime<0)
        {
          this.remaintimebool     = true;
        }
        
      // console.log(this.timedata);
      },
      error => {
      //  console.log(error);
      });
      this.EnergyData();
    //console.log(this.machineno);
  } 
  retrieverunningshift(): void {

    this.ShiftMasterService.getrunningshift()
      .subscribe(
        machinedata => {          
           // console.log(machinedata)
            this.shiftData=machinedata;
            this.runningshift=this.shiftData.sh;
            this.date=this.shiftData.dt;
            this.retrieveshiftenergy();
        },
        error => {
          console.log(error);
        });
  }
  retrieveshiftenergy(): void {
    this.shiftEnergyData          = [];
    var fDate                     = new Date(this.date).toISOString();
    var tDate                     = new Date(this.date).toISOString();    
    const data = {
      emname             : this.machinename,
      shift              : this.runningshift,
      start_date         : fDate,
      end_date           : tDate
    };
    this.FurnacedashService.getshiftenergyconsumptionhourly(data)
      .subscribe(
        machinedata => {  
           // console.log(machinedata)        
            this.shiftEnergyData=machinedata;
            this.shiftbatch=machinedata.data[0].runnigshiftbatch;
            this.todaybatch=machinedata.data2[0].Todaytotalbatch;
            this.todayenergy=machinedata.data3[0].todayKwhr;
            this.shiftenergy=machinedata.data1[0].shiftKwhr;
        },
        error => {
          console.log(error);
        });
  }
  retrieveidealenergy(): void {
    this.shiftEnergyData          = [];
    var fDate                     = new Date(this.date).toISOString();
    var setdate:any               = new Date()
    setdate                       = setdate.setDate(setdate.getDate() + 1); 
    var tDate                     = new Date().toISOString();     
    const data = {
      emname             : this.machinename,
      shift              : this.runningshift,
      start_date         : fDate,
      end_date           : tDate
    };
    this.FurnacedashService.getidealenergyconumption(data)
      .subscribe(
        machinedata => {  
            console.log(machinedata[0].used_energy)        
            this.todayidealenergy=machinedata[0].used_energy;

        },
        error => {
          console.log(error);
        });
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
