import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../_services/notification.service';
import { FurnacedashService } from '../_services';
import { first } from 'rxjs/operators';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AccountService } from '../_services';
import { User } from '../_models';
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
  public location: Location;
  public oprator;
  user: User;
  constructor(
    private toastr: NotificationService,
    private FurnacedashService: FurnacedashService, 
    private accountService: AccountService 
  ) { 
    this.accountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
   // this.EnergyData();
   if(this.user.friendly_name=="" || this.user.friendly_name=="All")
   {
     this.machinename='em1';
   }
   else
   {
    this.machinename=this.user.friendly_name;
   }
    this.timeData();
    this.id =setInterval (()=> {
     // this.EnergyData();
       this.timeData(); 
      
    }, 1000);
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
  timeData(){
    const data = {
      emname             : this.machinename    
    };
   this.FurnacedashService.getTimeData(data).subscribe(
      machinedata => {
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
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
