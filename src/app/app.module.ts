import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { ChartModule } from 'angular-highcharts';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FusionChartsModule } from "angular-fusioncharts";
import { Daterangepicker } from 'ng2-daterangepicker';
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
// import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
// FullCalendarModule.registerPlugins([ // register FullCalendar plugins
//   dayGridPlugin,
//   // interactionPlugin
// ]);
import { ToastrModule } from 'ngx-toastr';
import { DataTablesModule } from "angular-datatables";
import { ScheduleComponent } from './schedule/schedule.component';
import { MachineMasterComponent } from './machine-master/machine-master.component';
import { TagsMasterComponent } from './tags-master/tags-master.component';
import { BatchMasterComponent } from './batch-master/batch-master.component';
import { FurnaceDashboardComponent } from './furnace-dashboard/furnace-dashboard.component';
import { MeterhistoryComponent } from './meterhistory/meterhistory.component';
import { EnergyconsumptionComponent } from './energyconsumption/energyconsumption.component';
import { BatchdataComponent } from './batchdata/batchdata.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    ChartModule,
    HighchartsChartModule,
    DataTablesModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    }),
    // FullCalendarModule, // register FullCalendar with you app
    FusionChartsModule,
    Daterangepicker
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DashboardComponent,
    ScheduleComponent,
    MachineMasterComponent,
    TagsMasterComponent,
    BatchMasterComponent,
    FurnaceDashboardComponent,
    MeterhistoryComponent,
    EnergyconsumptionComponent,
    BatchdataComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
