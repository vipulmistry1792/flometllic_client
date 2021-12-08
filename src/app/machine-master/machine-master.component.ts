import { Component, OnInit } from '@angular/core';
import { MachineMaster } from '../_models';
import { MachineMasterService } from '../_services/machine-master.service';

@Component({
  selector: 'app-machine-master',
  templateUrl: './machine-master.component.html',
  styleUrls: ['./machine-master.component.scss']
})
export class MachineMasterComponent implements OnInit {
  public id                 = 0;
  public MachineData;
  public machine_name;
  public machineno = 1;
  public pinno = 0; 
  public friendlyname='';
  constructor(private MachineMasterService: MachineMasterService) { }

  ngOnInit(): void {
    this.retrievemachine();
  }
  retrievemachine(): void {
    this.MachineMasterService.getAll()
      .subscribe(
        machinedata => {
          this.MachineData=machinedata;
        },
        error => {
          console.log(error);
        });
  }
  AddData()
  {
    const data = {
      machine_name          : this.machine_name,
      machineno             : this.machineno,
      pinno                 : this.pinno,
      friendly_name         : this.friendlyname,
    };
    this.MachineMasterService.create(data)
      .subscribe(
        response => {
          this.retrievemachine();
          this.machine_name = '';
          this.machineno = 0;
          this.pinno = 0;
          this.friendlyname='';
        },
        error => {
          console.log(error);
        });
  }
   UpdateData(){
    const data = {
      machine_name          : this.machine_name,
      machineno             : this.machineno,
      pinno                 : this.pinno,
      friendly_name         : this.friendlyname,
    };
    this.MachineMasterService.update(this.id,data)
      .subscribe(
        response => {
          this.retrievemachine();
          this.machine_name = '';
          this.id           = 0;
          this.machineno    = 0;
          this.pinno        = 0;
          this.friendlyname = '';
        },
        error => {
          console.log(error);
        });
  }
  Edit($event:any,id)
  {
    const params = {};
    this.MachineMasterService.getById(id,params)
      .subscribe(
        machinedata => {
         this.id           = machinedata[0].id;
         this.machine_name = machinedata[0].machine_name;
         this.machineno    = machinedata[0].machineno;
         this.pinno        = machinedata[0].pinno;
         this.friendlyname = machinedata[0].friendly_name;
        },
        error => {
          console.log(error);
        });   
  }
  Delete($event:any,id)
  {
    this.MachineMasterService.delete(id)
      .subscribe(
        response => {
          this.retrievemachine();
        },
        error => {
          console.log(error);
        });
    
  }
}
