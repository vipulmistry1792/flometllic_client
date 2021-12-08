import { Component, OnInit } from '@angular/core';
import { Tags } from '../_models';
import { TagsService } from '../_services';
import { MachineMasterService } from '../_services';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tags-master',
  templateUrl: './tags-master.component.html',
  styleUrls: ['./tags-master.component.scss']
})
export class TagsMasterComponent implements OnInit {
  public prototype          = "Modbus RTU";
  public ipvisible          = false;
  public device_id          = 1 ;
  public device_name        = '';
  public device_add         = '';
  public data_type          = "Bool";
  public qty                = 1;
  public dataread_type      = "1";
  public start_address      = 0;
  public tag_name           = '';
  public secure             = 'Unsecure';
  public secure1             = 0;
  public username           = '';
  public password           = '';
  public ns                 = 4;
  public i                  = 1;
  public id                 = 0;
  public MachineData;
  public interval;
  public Tags_Data;
  public Series;
  tags?                     : Tags[];
  tag: Tags = {
    id                : this.id,
    tag_name          : this.tag_name,
    device_name       : this.device_name,
    device_id         : this.device_id,
    data_type         : this.data_type,
    prototype         : this.prototype,
    start_address     : this.start_address,
    qty               : this.qty,
    device_add        : this.device_add,
    dataread_type     : this.dataread_type,
    secure            : this.secure1,
    username          : this.username,
    password          : this.password,
    ns                : this.ns,
    i                 : this.i
  };
  constructor(private TagsService: TagsService,private MachineMasterService: MachineMasterService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.interval = this.retrieveTags();
    this.retrievemachine();
  }
  Secure_Check()
  {
    if(this.secure == "Secure")
    {
      this.secure1 = 0;
      this.secure  = "Unsecure";
    }
    else{
      this.secure1 = 1;
      this.secure  ="Secure";      
    }
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
  onTagChange()
  {
   // console.log("TAG CHANGE");
    if(this.data_type=='Int32' || this.data_type=='Float32' )
    {
      this.qty=2;
    }
    else if(this.data_type=='Float64')
    {
      this.qty=4;
    }
    else
    {
      this.qty=1;
    }
    
  }
  retrieveTags(): void {
    this.TagsService.getAll()
      .subscribe(
        tag_data => {
          this.tags = tag_data;
          this.Tags_Data=tag_data;
          for (let index = 0; index < this.Tags_Data.length; index++) {
            let tagname=this.Tags_Data[index].DeviceName+'_'+this.Tags_Data[index].TagName;
            console.log(tagname);
          }
        },
        error => {
          console.log(error);
        });
  }
  AddData()
  {
    const data = {
      tag_name          : this.tag_name,
      device_name       : this.device_name,
      device_id         : this.device_id,
      data_type         : this.data_type,
      prototype         : this.prototype,
      start_address     : this.start_address,
      qty               : this.qty,
      device_add        : this.device_add,
      dataread_type     : this.dataread_type,
      secure            : this.secure1,
      username          : this.username,
      password          : this.password,
      ns                : this.ns,
      i                 : this.i
    };
    this.TagsService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTags();
          this.retrievemachine();
          //this.submitted = true;
           this.prototype          = "Modbus RTU";
           this.ipvisible          = false;
           this.device_id          = 1 ;
           this.device_name        = '';
           this.device_add         = '';
           this.data_type          = "Bool";
           this.qty                = 1;
           this.dataread_type      = "1";
           this.start_address      = 0;
           this.tag_name           = '';
           this.secure             = 'Unsecure';
           this.secure1             = 0;
           this.username           = '';
           this.password           = '';
           this.ns                 = 4;
           this.i                  = 1;         
        },
        error => {
          console.log(error);
        });
  }
   UpdateData()
  {
    const data = {
      id              : this.id,
      tag_name        : this.tag_name,
      device_name     : this.device_name,
      device_id       : this.device_id,
      data_type       : this.data_type,
      prototype       : this.prototype,
      start_address   : this.start_address,
      qty             : this.qty,
      device_add      : this.device_add,
      dataread_type   : this.dataread_type,
      secure          : this.secure1,
      username        : this.username,
      password        : this.password,
      ns              : this.ns,
      i               : this.i
    };
    this.TagsService.update(data)
      .subscribe(
        response => {
          console.log(response);
          this.showNotification('top','right',response);
          this.retrieveTags();
          this.retrievemachine();
          //this.submitted = true;
           this.prototype          = "Modbus RTU";
           this.ipvisible          = false;
           this.device_id          = 1 ;
           this.device_name        = '';
           this.device_add         = '';
           this.data_type          = "Bool";
           this.qty                = 1;
           this.dataread_type      = "1";
           this.start_address      = 0;
           this.tag_name           = '';
           this.secure             = 'Unsecure';
           this.secure1            = 0;
           this.username           = '';
           this.password           = '';
           this.ns                 = 4;
           this.i                  = 1;
           this.id                 = 0;         
        },
        error => {
          console.log(error);
        });
  }
  Edit($event:any,tag)
  {
    this.prototype          = tag.Protocol;
    //this.ipvisible          = tag.DeviceAdd;
    this.device_id          = tag.DeviceNo;
    this.device_name        = tag.DeviceName;
    this.device_add         = tag.DeviceAdd;
    this.data_type          = tag.DataType;
    this.qty                = tag.Qty;
    this.dataread_type      = tag.FunctionType;
    this.start_address      = tag.StartAdd;
    this.tag_name           = tag.TagName;
    //this.secure             = tag.;
   // this.secure1            = tag.;
    this.username           = tag.Username;
    this.password           = tag.Password;
    this.ns                 = tag.NS;
    this.i                  = tag.I;
    this.id                 = tag.Id;
  }
  Delete($event:any,tag)
  {
    this.TagsService.delete(tag.Id,tag)
      .subscribe(
        response => {
         // console.log(response);
          this.retrieveTags();
          //this.submitted = true;        
        },
        error => {
          console.log(error);
        });
    
  }
  showNotification(from, align,response){
    console.log(response);
    const color = Math.floor((Math.random() * 5) + 1);

    switch(response.type){
      case 1:
      this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-info alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 2:
      this.toastr.success(`<span class="now-ui-icons ui-1_bell-53"></span> ${response.message}.`, '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-success alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 3:
      this.toastr.warning('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
         timeOut: 8000,
         closeButton: true,
         enableHtml: true,
         toastClass: "alert alert-warning alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
      break;
      case 4:
      this.toastr.error(`<span class="now-ui-icons ui-1_bell-53"></span> ${response.message}`, '', {
         timeOut: 8000,
         enableHtml: true,
         closeButton: true,
         toastClass: "alert alert-danger alert-with-icon",
         positionClass: 'toast-' + from + '-' +  align
       });
       break;
       case 5:
       this.toastr.show('<span class="now-ui-icons ui-1_bell-53"></span> Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer.', '', {
          timeOut: 8000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
      break;
      default:
      break;
    }
}
}
