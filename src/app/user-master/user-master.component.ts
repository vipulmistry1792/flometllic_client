import { Component, OnInit } from '@angular/core';
import { BatchMaster, MachineMaster,User } from '../_models';
import { MachineMasterService,BatchMasterService,NotificationService,AccountService } from '../_services';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {
  public id                 = 0;
  public MachineData;
  public UserData;
  public username;
  public password;
  public firstName;
  public lastName;
  public cr=1;
  public Type=1;
  public machineno='';
  user: User;
  constructor(
    private MachineMasterService: MachineMasterService,
    private toastr: NotificationService,
    private BatchMasterService: BatchMasterService,
    private AccountService: AccountService

  ) { 
    this.AccountService.user.subscribe(x => this.user = x);
  }

  ngOnInit(): void {
    this.retrieveMachine();
    this.retrieveUserData();
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
  retrieveUserData(): void {
    this.AccountService.getAll()
      .subscribe(
        machinedata => {
          this.UserData=machinedata;
         // console.log(this.BatchData);
        },
        error => {
          console.log(error);
        });
  }
  AddData()
  {
    const data = {
      username:this.username,
      password:this.password,
      firstName:this.firstName,
      lastName:this.lastName,
      Type:this.Type,
      friendly_name:this.machineno      
    };    
    this.AccountService.register(data)
      .subscribe(
        response => {
          this.retrieveUserData();
          this.retrieveMachine();
          this.username=''
          this.password=''
          this.firstName=''
          this.lastName=''
          this.Type=1
          this.machineno=''
          this.toastr.showSuccess("Record Inserted","User")
        },
        error => {
          this.toastr.showError("Record Inserted Failed","User")
          console.log(error);
        });
  }
   UpdateData(){
    const data = {
      username:this.username,
      password:this.password,
      firstName:this.firstName,
      lastName:this.lastName,
      Type:this.Type,
      friendly_name:this.machineno      
    };  
    this.AccountService.update(this.id,data)
      .subscribe(
        response => {
          this.retrieveUserData();
          this.retrieveMachine();
          this.id=0;
          this.username=''
          this.password=''
          this.firstName=''
          this.lastName=''
          this.Type=1
          this.machineno=''
          this.toastr.showSuccess("Record Updated","User")
        },
        error => {
          this.toastr.showError("Record Update Failed","User")
          console.log(error);
        });
  }
  Edit($event:any,id)
  {
    const params = {};
    this.AccountService.getById(id)
      .subscribe(
        machinedata => {
         this.id           = machinedata[0].id;
         this.machineno    = machinedata[0].friendly_name;
         this.username     = machinedata[0].username
         this.password     = machinedata[0].hash
         this.firstName    = machinedata[0].firstName
         this.lastName     = machinedata[0].lastName
         this.Type         = machinedata[0].user_control
        },
        error => {
          console.log(error);
        });   
  }
  Delete($event:any,id)
  {
    this.AccountService.delete(id)
      .subscribe(
        response => {
          this.retrieveUserData();
          this.toastr.showSuccess("Record Deleted","User")
        },
        error => {
          console.log(error);
        });
    
  }
  onTypeChange($event:any){
    
    if(this.id!=0)
    {
       
    }
    else{
      let check= 0;
      let mcno;

    }
    //console.log(this.machineno);
  } 
}
