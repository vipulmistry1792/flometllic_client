import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ScheduleService } from '../_services';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  Tommorrowproject                         : string = 'Other_Non-Chargeable';
  Tommorrowlocation                        : string = 'Office';
  Todayproject                             : string = 'Other_Non-Chargeable';
  Todaylocation                            : string = 'Office';
  Tommorrowwork                            : string = '';
  Todaywork                                : string = '';
  subscription: Subscription
  public scheduledata         : any;
  public headings;
  public datas;
  public id;
  public loading                    : boolean;
  public datains={};
  constructor(
    private datepipe: DatePipe,
    private scheduledataservice     : ScheduleService,


  ) { }

  ngOnInit(): void {
    this.httpRequest();
    console.log(this.scheduledata);   
  }
  httpRequest() {
    this.loading      = true; 
   this.scheduledataservice.getAll()
   .pipe(first())
   .subscribe(users => this.scheduledata = users);
   console.log(this.scheduledata);   
   this.loading      = false;
 }
 onSave()
 {
   this.datains={
     "Tommorrowproject":this.Tommorrowproject,
     "Tommorrowwork":this.Tommorrowwork,
     "Tommorrowlocation":this.Tommorrowlocation,
     "Todayproject":this.Todayproject,
     "Todaywork":this.Todaywork,
     "Todaylocation":this.Todaylocation,     
   }
  this.scheduledataservice.InsertData(this.datains)
 }
}
