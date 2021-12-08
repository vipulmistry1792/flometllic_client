import { Routes } from '@angular/router';
import { AuthGuard } from '../../_helpers';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
//import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ScheduleComponent } from '../../schedule/schedule.component';
import { MachineMasterComponent } from '../../machine-master/machine-master.component';
import { TagsMasterComponent } from '../../tags-master/tags-master.component';
import { BatchMasterComponent } from '../../batch-master/batch-master.component';
import { FurnaceDashboardComponent } from '../../furnace-dashboard/furnace-dashboard.component';
import { MeterhistoryComponent } from '../../meterhistory/meterhistory.component';
import { EnergyconsumptionComponent } from '../../energyconsumption/energyconsumption.component';
import { BatchdataComponent } from '../../batchdata/batchdata.component';
export const AdminLayoutRoutes: Routes = [
   // { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },    
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path:'furnace',component:FurnaceDashboardComponent,canActivate: [AuthGuard]},
    { path:'dashboard-overview',component:DashboardComponent,canActivate: [AuthGuard]},
   // { path:'Schedule',component:ScheduleComponent,canActivate: [AuthGuard]},
    { path: 'machine',component:MachineMasterComponent ,canActivate: [AuthGuard] },
    { path: 'tags',component:TagsMasterComponent ,canActivate: [AuthGuard] },
    { path: 'batch',component:BatchMasterComponent ,canActivate: [AuthGuard] },
    { path: 'meterhistory',component:MeterhistoryComponent ,canActivate: [AuthGuard] },
    { path: 'energy',component:EnergyconsumptionComponent ,canActivate: [AuthGuard] },
    { path: 'batchdata',component:BatchdataComponent ,canActivate: [AuthGuard] }


];
