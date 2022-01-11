import { Component, OnInit } from '@angular/core';
import { Shiftmaster } from '../_models';
import { ShiftmasterService } from '../_services';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-shiftmaster',
  templateUrl: './shiftmaster.component.html',
  styleUrls: ['./shiftmaster.component.css']
})
export class ShiftmasterComponent implements OnInit {
  public id                 = 0;
  public ShiftData;
  public shiftno;
  public starttime;
  public endtime;
  public shifttime;

  constructor(private datepipe: DatePipe,private ShiftmasterService: ShiftmasterService) { }

  ngOnInit(): void {
    this.starttime                         = new Date();
    this.endtime                           = new Date();
    this.retrievemachine();
  }
  retrievemachine(): void {
    this.ShiftmasterService.getAll()
      .subscribe(
        machinedata => {
          this.ShiftData=machinedata;
        },
        error => {
          console.log(error);
        });
  }
  AddData()
  {
    var fDate                     = this.starttime.toISOString();
    var tDate                     = this.endtime.toISOString();
    const data = {
      shiftno               : this.shiftno,
      starttime             : fDate,
      endtime               : tDate,
      shifttime             : this.shifttime,
    };
    this.ShiftmasterService.create(data)
      .subscribe(
        response => {
          this.retrievemachine();
          this.shiftno = 0;
          this.starttime = '';
          this.endtime = '';
          this.shifttime=0;
        },
        error => {
          console.log(error);
        });
  }
   UpdateData(){
    var fDate                     = new Date(this.starttime).toISOString();
    var tDate                     = new Date(this.endtime).toISOString();
    const data = {
      shiftno               : this.shiftno,
      starttime             : fDate,
      endtime               : tDate,
      shifttime             : this.shifttime,
    };
    this.ShiftmasterService.update(this.id,data)
      .subscribe(
        response => {
          this.retrievemachine();
          this.shiftno = 0;
          this.starttime = '';
          this.endtime = '';
          this.shifttime=0;
        },
        error => {
          console.log(error);
        });
  }
  Edit($event:any,id)
  {
    const params = {};
    this.ShiftmasterService.getById(id,params)
      .subscribe(
        shiftdata => {
         this.id           = shiftdata[0].id;
         this.shiftno      = shiftdata[0].shiftno;
         this.starttime    = shiftdata[0].starttime;
         this.endtime      = shiftdata[0].endtime;
         this.shifttime    = shiftdata[0].shifttime;
        },
        error => {
          console.log(error);
        });   
  }
  Delete($event:any,id)
  {
    this.ShiftmasterService.delete(id)
      .subscribe(
        response => {
          this.retrievemachine();
        },
        error => {
          console.log(error);
        });
    
  }
}
