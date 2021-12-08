import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart } from 'angular-highcharts';
import { Color} from 'highcharts';
import { first } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);
import { Subscription } from 'rxjs';
import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
import { environment } from '../../environments/environment';
import { MqttDataService } from '../_services';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  subscription: Subscription
  title = 'appBootstrap';
  
  closeResult: string;
  dateValue                         = new Date();
  dateValue1                        = new Date();
  custom                            = 0;
  public mqtt_lastdata         : any;
  highcharts = Highcharts;
  public headings=[];
  public headings1=[];
  public datas=[];
  public id;
  public loading                    : boolean;
  public column_array=[];
  public length;
  public rowdata;
  dtOptions: any = {}
  
  constructor(
     private datepipe: DatePipe,
     private http         : HttpClient,
     private MqttData     : MqttDataService,
     private modalService: NgbModal
     ) { 
  }
  
  open(content,type) {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      dom: 'Bfrtip',
      "lengthMenu": [5,10, 25, 50, -1],
      "scrollX": true,
      buttons: ['excel', 'csv', 'pdf', 'copy'],
  }
    if(type=="ongoing")
    {
      this.headings=[];
      this.headings1=[];
      this.datas=[];
      this.column_array=[];
      this.title="Ongoing Project Details"
      this.headings1=this.mqtt_lastdata.inprogress_data[0];
      //this.datas=this.mqtt_lastdata.inprogress_data;
      for (let index = 0; index < this.headings1.length; index++) {
        const element = this.headings1[index];
       if(index==0 || index==18 || index==1 || index==2 || index==this.headings1.length-1 || index==this.headings1.length-2 || index==this.headings1.length-3  )
       {
          this.headings.push(element)
          this.column_array.push(index);         
       }
      
       else if(element =="Engineer" || element =="Actual Mandays for Site Commissioning" || element =="Planned Mandays for Site Commissioning" || element =="Actual Mandays for Software Development" || element =="Planned Mandays for Software Development"  || element =="Final Status")
       {
        if(element =="Planned Mandays for Software Development" || element =="Final Status")
        {
          this.headings.push(this.headings1[index-1])
          this.column_array.push(index-1);
          let elst=this.headings1[index-1];         
         // this.headings.push(elst.replace(/(\r\n|\n|\r)/gm, "<br />"))
         
          let elst1=element;         
         // this.headings.push(elst1.replace(/(\r\n|\n|\r)/gm, "<br />"))        
          this.headings.push(element)
          this.column_array.push(index);
        }
        else{
          let elst1=element;         
          this.headings.push(elst1) 
          this.column_array.push(index);         
        }
       }
        
      }
    //  console.log(this.headings);  
  //    console.log(this.column_array);            
    //  | slice:1
      for (let index3 = 0; index3 < this.mqtt_lastdata.inprogress_data.length; index3++) {
        this.rowdata = this.mqtt_lastdata.inprogress_data[index3];
        let row=[]
        for (let j = 0; j < this.column_array.length; j++) {
            let col=this.column_array[j];
            let colname=this.headings[j];
            let value=this.rowdata[col]
           // console.log(`${col}=${value}`);
                row.push(value)
        }
     //   console.log(row);
                
        this.datas.push(row)
      }
    }
    else if(type=="no clearance")
    {
      // this.headings=[];
      // this.datas=[];
      // this.title="No Clearance details"
      // this.headings=this.mqtt_lastdata.noclearance_data[0];
      // this.datas=this.mqtt_lastdata.noclearance_data;
      this.headings=[];
      this.headings1=[];
      this.datas=[];
      this.column_array=[];
      this.title="No Clearance details"
      this.headings1=this.mqtt_lastdata.noclearance_data[0];
      //this.datas=this.mqtt_lastdata.inprogress_data;
      for (let index = 0; index < this.headings1.length; index++) {
        const element = this.headings1[index];
       if(index==0 ||  index==18 || index==1 || index==2 || index==this.headings1.length-1 || index==this.headings1.length-2 || index==this.headings1.length-3  )
       {
          this.headings.push(element)
          this.column_array.push(index);         
       }
       else if(element =="Engineer" || element =="Actual Mandays for Site Commissioning" || element =="Planned Mandays for Site Commissioning" || element =="Actual Mandays for Software Development" || element =="Planned Mandays for Software Development" || element =="Planned Mandays for Software Development" || element =="Final Status")
       {

        if(element =="Planned Mandays for Software Development" || element =="Final Status")
        {
          this.headings.push(this.headings1[index-1])
          this.column_array.push(index-1);
          let elst=this.headings1[index-1];         
          //this.headings.push(elst.replace(/(\r\n|\n|\r)/gm, "<br />"))
         
          let elst1=element;         
         // this.headings.push(elst1.replace(/(\r\n|\n|\r)/gm, "<br />"))        
        //  this.headings.push(element)
          this.column_array.push(index);
        }
        else{
          let elst1=element;         
          this.headings.push(elst1) 
          this.column_array.push(index);         
        }
       }
        
      }
      //console.log(this.mqtt_lastdata.inprogress_data);            
    //  | slice:1
      for (let index3 = 0; index3 < this.mqtt_lastdata.noclearance_data.length; index3++) {
        this.rowdata = this.mqtt_lastdata.noclearance_data[index3];
        let row=[]
        for (let j = 0; j < this.column_array.length; j++) {
            let col=this.column_array[j];
            let colname=this.headings[j];
            let value=this.rowdata[col]
           // console.log(`${col}=${value}`);
                row.push(value)
        }        
        this.datas.push(row)
      }
    }
    else if(type=="Software Developemnt")
    {
      // this.headings=[];
      // this.datas=[];
      // this.title="Software Developemnt details"
      // this.headings=this.mqtt_lastdata.softwaredev_data[0];
      // this.datas=this.mqtt_lastdata.softwaredev_data;
      this.headings=[];
      this.headings1=[];
      this.datas=[];
      this.column_array=[];
      this.title="Software Developemnt details"
      this.headings1=this.mqtt_lastdata.softwaredev_data[0];
      //this.datas=this.mqtt_lastdata.inprogress_data;
      for (let index = 0; index < this.headings1.length; index++) {
        const element = this.headings1[index];
       if(index==0 || index==18 || index==1 || index==2 || index==this.headings1.length-1 || index==this.headings1.length-2 || index==this.headings1.length-3  )
       {
          this.headings.push(element)
          this.column_array.push(index);         
       }
       else if(element =="Engineer" || element =="Actual Mandays for Site Commissioning" || element =="Planned Mandays for Site Commissioning" || element =="Actual Mandays for Software Development" || element =="Planned Mandays for Software Development" || element =="Planned Mandays for Software Development" || element =="Final Status")
       {

        if(element =="Planned Mandays for Software Development" || element =="Final Status")
        {
          this.headings.push(this.headings1[index-1])
          this.column_array.push(index-1);
          let elst=this.headings1[index-1];         
        //  this.headings.push(elst.replace(/(\r\n|\n|\r)/gm, "<br />"))
         
          let elst1=element;         
         // this.headings.push(elst1.replace(/(\r\n|\n|\r)/gm, "<br />"))        
         this.headings.push(element)
          this.column_array.push(index);
        }
        else{
          let elst1=element;         
          this.headings.push(elst1) 
          this.column_array.push(index);         
        }
       }
        
      }
      //console.log(this.mqtt_lastdata.inprogress_data);            
    //  | slice:1
      for (let index3 = 0; index3 < this.mqtt_lastdata.softwaredev_data.length; index3++) {
        this.rowdata = this.mqtt_lastdata.softwaredev_data[index3];
        let row=[]
        for (let j = 0; j < this.column_array.length; j++) {
            let col=this.column_array[j];
            let colname=this.headings[j];
            let value=this.rowdata[col]
           // console.log(`${col}=${value}`);
                row.push(value)
        }        
        this.datas.push(row)
      }
    }
    else if(type=="lastmonth")
    {
      this.headings=[];
      this.datas=[];
      this.title="Last Month details"
      this.headings=this.mqtt_lastdata.last_monthinvoicedata[0];
      this.datas=this.mqtt_lastdata.last_monthinvoicedata;
    }
    else if(type=="currentmonth")
    {
      this.headings=[];
      this.datas=[];
      this.title="Current Month details"
      this.headings=this.mqtt_lastdata.curr_monthinvoicedata[0];
      this.datas=this.mqtt_lastdata.curr_monthinvoicedata;
    }
    else if(type=="thisyear")
    {
      this.headings=[];
      this.datas=[];
      this.title="Current Year details"
      this.headings=this.mqtt_lastdata.year_monthinvoicedata[0];
      this.datas=this.mqtt_lastdata.year_monthinvoicedata;
    }

    else if(type=="pendinglast")
    {
      //cmonth
      this.headings=['Sr. No','Bill Number','Bill Date','Customer name','VoucherAmount','PendingAmount','Payment Status',	'Received Amount',	'Received Date','	Due Date',	'Comment'];
      this.datas=[];
      this.title=`${this.mqtt_lastdata.lmonth} Pending Amount`
    //  this.headings=this.mqtt_lastdata.pendingamount_datalast[0];
     // console.log(this.headings)
      this.datas=this.mqtt_lastdata.pendingamount_datalast;
      console.log(this.datas)
    }
    else if(type=="pendingcurrent")
    {
      //cmonth
      this.headings=['Sr. No','Bill Number','Bill Date','Customer name','VoucherAmount','PendingAmount','Payment Status',	'Received Amount',	'Received Date','	Due Date',	'Comment'];
      this.datas=[];
      this.title=`${this.mqtt_lastdata.cmonth} Pending Amount`
    //  this.headings=this.mqtt_lastdata.pendingamount_datacurrent[0];
      this.datas=this.mqtt_lastdata.pendingamount_datacurrent;
    }
    else if(type=="pendingyear")
    {
      //cmonth
      this.headings=['Sr. No','Bill Number','Bill Date','Customer name','VoucherAmount','PendingAmount','Payment Status',	'Received Amount',	'Received Date','	Due Date',	'Comment'];
      this.datas=[];
      this.title=`Current Year Pending Amount`
     // this.headings=this.mqtt_lastdata.pendingamount_datayear[0];
      this.datas=this.mqtt_lastdata.pendingamount_datayear;
    }
    else if(type=="receivelast")
    {
      //cmonth
      this.headings=['Sr. No','Bill Number','Bill Date','Customer name','VoucherAmount','PendingAmount','Payment Status',	'Received Amount',	'Received Date','	Due Date',	'Comment'];
      this.datas=[];
      this.title=`${this.mqtt_lastdata.lmonth} receive Amount`
     // this.headings=this.mqtt_lastdata.receiveamount_datalast[0];
      this.datas=this.mqtt_lastdata.receiveamount_datalast;
    }
    else if(type=="receivecurrent")
    {
      //cmonth
      this.headings=['Sr. No','Bill Number','Bill Date','Customer name','VoucherAmount','PendingAmount','Payment Status',	'Received Amount',	'Received Date','	Due Date',	'Comment'];
      this.datas=[];
      this.title=`${this.mqtt_lastdata.cmonth} receive Amount`
     // this.headings=this.mqtt_lastdata.receiveamount_datacurrent[0];
      this.datas=this.mqtt_lastdata.receiveamount_datacurrent;
    }
    else if(type=="receiveyear")
    {
      //cmonth
      this.headings=['Sr. No','Bill Number','Bill Date','Customer name','VoucherAmount','PendingAmount','Payment Status',	'Received Amount',	'Received Date','	Due Date',	'Comment'];
      this.datas=[];
      this.title=`Current Year receive Amount`
      //this.headings=this.mqtt_lastdata.receiveamount_datayear[0];
      this.datas=this.mqtt_lastdata.receiveamount_datayear;
    }
    else if(type=="criticallast")
    {
      //cmonth
      this.headings=['Sr. No','Bill Number','Bill Date','Customer name','VoucherAmount','PendingAmount','Payment Status',	'Received Amount',	'Received Date','	Due Date',	'Comment'];
      this.datas=[];
      this.title=`${this.mqtt_lastdata.lmonth} critical Amount`
     // this.headings=this.mqtt_lastdata.criticalamount_datalast[0];
      this.datas=this.mqtt_lastdata.criticalamount_datalast;
    }
    else if(type=="criticalcurrent")
    {
      //cmonth
      this.headings=['Sr. No','Bill Number','Bill Date','Customer name','VoucherAmount','PendingAmount','Payment Status',	'Received Amount',	'Received Date','	Due Date',	'Comment'];
      this.datas=[];
      this.title=`${this.mqtt_lastdata.cmonth} critical Amount`
      //this.headings=this.mqtt_lastdata.criticalamount_datacurrent[0];
      this.datas=this.mqtt_lastdata.criticalamount_datacurrent;
    }
    else if(type=="criticalyear")
    {
      //cmonth
      this.headings=['Sr. No','Bill Number','Bill Date','Customer name','VoucherAmount','PendingAmount','Payment Status',	'Received Amount',	'Received Date','	Due Date',	'Comment'];
      this.datas=[];
      this.title=`Current Year critical Amount`
     // this.headings=this.mqtt_lastdata.criticalamount_datayear[0];
      this.datas=this.mqtt_lastdata.criticalamount_datayear;
    }
    else if(type=="opencomplain")
    {
      this.headings=[];
      this.datas=[];
      this.title="Open Complaint"
      this.headings=this.mqtt_lastdata.open_complain_data[0];
      this.datas=this.mqtt_lastdata.open_complain_data;
    }
    else if(type=="closecomplain")
    {
      this.headings=[];
      this.datas=[];
      this.title="Close Complaint"
      this.headings=this.mqtt_lastdata.close_complain_data[0];
      this.datas=this.mqtt_lastdata.close_complain_data;
    }
    else if(type=="trdpendlast")
    {
      this.headings=[];
      this.datas=[];
      this.title="Trading Pending Orders Last Finacial Year"
      this.headings=this.mqtt_lastdata.trd_pendlast[0];
      this.datas=this.mqtt_lastdata.trd_pendlast;
    }
    else if(type=="trdpendcurr")
    {
      this.headings=[];
      this.datas=[];
      this.title="Trading Pending Orders Current Finacial Year"
      this.headings=this.mqtt_lastdata.trd_pendcurr[0];
      this.datas=this.mqtt_lastdata.trd_pendcurr;
    }
    else if(type=="trdcomplast")
    {
      this.headings=[];
      this.datas=[];
      this.title="Trading Complete Orders Last Finacial Year"
      this.headings=this.mqtt_lastdata.trd_complelast[0];
      this.datas=this.mqtt_lastdata.trd_complelast;
    }
    else if(type=="trdcompcurr")
    {
      this.headings=[];
      this.datas=[];
      this.title="Trading Complete Orders Current Finacial Year"
      this.headings=this.mqtt_lastdata.trd_complecurr[0];
      this.datas=this.mqtt_lastdata.trd_complecurr;
    }
    else if(type=="projectok")
    {
      this.headings=[];
      this.datas=[];
      this.title="Customer Project Feedback Ok"
      this.headings=this.mqtt_lastdata.projectok_data[0];
      this.datas=this.mqtt_lastdata.projectok_data;
    }
    else if(type=="projectnotok")
    {
      this.headings=[];
      this.datas=[];
      this.title="Customer Project Feedback Not-Ok"
      //console.log(this.mqtt_lastdata.projectnotok_data[0]);
      
      this.headings=this.mqtt_lastdata.projectnotok_data[0];
      this.datas=this.mqtt_lastdata.projectnotok_data;
    }
    else if(type=="serviceok")
    {
      this.headings=[];
      this.datas=[];
      this.title="Customer Service Feedback Ok"
      this.headings=this.mqtt_lastdata.serviceok_data[0];
      this.datas=this.mqtt_lastdata.servicenotok_data;
    }
    else if(type=="servicenotok")
    {
      this.headings=[];
      this.datas=[];
      this.title="Customer Service Feedback Not-Ok"
      this.headings=this.mqtt_lastdata.servicenotok_data[0];
      this.datas=this.mqtt_lastdata.servicenotok_data;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  showhide(){

  }

  ngOnInit(): void {
   this.httpRequest();
  //  this.id =setInterval (()=> {
  //     this.httpRequest();   
  //     console.log(this.mqtt_lastdata);
        
  //   }, 10000);
  this.dtOptions = {
    pagingType: 'simple_numbers',
    dom: 'Bfrtip',
    "lengthMenu": [5,10, 25, 50],
    "scrollX": true,
    buttons: ['excel', 'csv', 'pdf', 'copy'],
}
  }
  httpRequest() {
    this.loading      = true; 
   this.MqttData.getAll()
   .pipe(first())
   .subscribe(users => this.mqtt_lastdata = users);
   console.log(this.mqtt_lastdata);
   
   this.loading      = false;
 }

 ngOnDestroy() {
   if (this.id) {
     clearInterval(this.id);
   }
 }
}
