import { Component, OnInit } from '@angular/core';
import { BatchMaster, MachineMaster } from '../_models';
import { NotificationService } from '../_services/notification.service';
import { MachineMasterService } from '../_services/machine-master.service';
import { BatchMasterService } from '../_services/batch-master.service';
//import { exit } from 'process';
@Component({
  selector: 'app-batch-master',
  templateUrl: './batch-master.component.html',
  styleUrls: ['./batch-master.component.scss']
})
export class BatchMasterComponent implements OnInit {
  public id                 = 0;
  public machineno          = 1;
  public batchno            = 'A-1';
  public batchtime          = 0;
  public kwh_ton            = 0;
  public upr_limit          = 100;
  public mdl_limit          = 80;
  public lwr_limit          = 20;
  public kwh                = 0;
  public MachineData;
  public BatchData;
  constructor(
    private MachineMasterService: MachineMasterService,
    private toastr: NotificationService,
    private BatchMasterService: BatchMasterService,

  ) { }

  ngOnInit(): void {
    this.retrieveMachine();
    this.retrieveBatchData();
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
  retrieveBatchData(): void {
    this.BatchMasterService.getAll()
      .subscribe(
        machinedata => {
          this.BatchData=machinedata;
         // console.log(this.BatchData);
        },
        error => {
          console.log(error);
        });
  }
  AddData()
  {
    const data = {
      machineno             : this.machineno,
      batchno               : this.batchno,
      batchtime             : this.batchtime,
      kwh_ton               : this.kwh_ton,
      upr_limit             : this.upr_limit,
      mdl_limit             : this.mdl_limit,
      lwr_limit             : this.lwr_limit,
      kwh                   : this.kwh
      
    };
    console.log(data);
    
    this.BatchMasterService.create(data)
      .subscribe(
        response => {
          this.retrieveBatchData();
          this.retrieveMachine();
          this.machineno = 0;
          this.batchno='';
          this.batchtime=0;
          this.kwh_ton=0;
          this.lwr_limit=0;
          this.mdl_limit=0;
          this.upr_limit=0;
          this.kwh=0;
          this.toastr.showSuccess("Record Inserted","Batch")
        },
        error => {
          this.toastr.showError("Record Inserted Failed","Batch")
          console.log(error);
        });
  }
   UpdateData(){
    const data = {
      machineno             : this.machineno,
      batchno               : this.batchno,
      batchtime             : this.batchtime,
      kwh_ton               : this.kwh_ton,
      upr_limit             : this.upr_limit,
      mdl_limit             : this.mdl_limit,
      lwr_limit             : this.lwr_limit,
      kwh                   : this.kwh
    };
    this.BatchMasterService.update(this.id,data)
      .subscribe(
        response => {
          this.retrieveBatchData();
          this.retrieveMachine();
          this.machineno = 0;
          this.batchno='';
          this.batchtime=0;
          this.kwh_ton=0;
          this.lwr_limit=0;
          this.mdl_limit=0;
          this.upr_limit=0;
          this.kwh      =0;
          this.id=0;
          this.toastr.showSuccess("Record Updated","Batch")
        },
        error => {
          this.toastr.showError("Record Update Failed","Batch")
          console.log(error);
        });
  }
  Edit($event:any,id)
  {
    const params = {};
    this.BatchMasterService.getById(id,params)
      .subscribe(
        machinedata => {
         this.id           = machinedata[0].id;
         this.machineno    = machinedata[0].machineno;
         this.batchno      = machinedata[0].batchno,
         this.batchtime    = machinedata[0].stdbatchtime,
         this.kwh_ton      = machinedata[0].ton_kwh,
         this.upr_limit    = machinedata[0].upr_lmt,
         this.lwr_limit    = machinedata[0].lwr_lmt,
         this.mdl_limit    = machinedata[0].mdl_lmt,
         this.kwh    = machinedata[0].kwh
        },
        error => {
          console.log(error);
        });   
  }
  Delete($event:any,id)
  {
    this.BatchMasterService.delete(id)
      .subscribe(
        response => {
          this.retrieveBatchData();
          this.toastr.showSuccess("Record Deleted","Batch")
        },
        error => {
          console.log(error);
        });
    
  }
  onMachineChange($event:any){
    
    if(this.id!=0)
    {
       
    }
    else{
      let check= 0;
      let mcno;
      for (let index = 0; index < this.MachineData.length; index++) {
        var element = this.MachineData[index].machineno;
        if(element==this.machineno)
        {
          mcno=this.MachineData[index].machine_name;
         // exit;
        }
      }
      for (let index = 0; index < this.BatchData.length; index++) {
        var element = this.BatchData[index].machineno;
        if(element==mcno)
        {
          alert("You Cant select this Machine");
          this.machineno=0;
         // exit;
        }
      }
    }
    //console.log(this.machineno);
  }  
}
