import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AccountService } from '../../_services';
import { User } from '../../_models';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/furnace', title: 'Furnace Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },   
    { path: '/meterhistory', title: 'Meter History',  icon: 'ni-bullet-list-67 text-red', class: '' },
    { path: '/machine', title: 'Machine Master',  icon: 'ni-bullet-list-67 text-red', class: '' },
    { path: '/tags', title: 'Tag Master',  icon: 'ni-bullet-list-67 text-red', class: '' },
    { path: '/batch', title: 'Batch Master',  icon: 'ni-bullet-list-67 text-red', class: '' }
];
export const ROUTES1: RouteInfo[] = [
  { path: '/furnace', title: 'Furnace Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/meterhistory', title: 'Meter History',  icon: 'ni-bullet-list-67 text-red', class: '' },
  { path: '/batch', title: 'Batch Master',  icon: 'ni-bullet-list-67 text-red', class: '' }
];
export const ROUTES2: RouteInfo[] = [
  { path: '/furnace', title: 'Furnace Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/meterhistory', title: 'Meter History',  icon: 'ni-bullet-list-67 text-red', class: '' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public focus;
  public listTitles: any[];
  public location: Location;
  public oprator;
  user: User;
  constructor(location: Location, private router: Router,private accountService: AccountService) {
    this.location = location;
    this.accountService.user.subscribe(x => this.user = x);
   }

  ngOnInit() {
    if(this.user['user_control']==0){
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    else if(this.user['user_control']==1){
      this.menuItems = ROUTES1.filter(menuItem => menuItem);
    }
    else if(this.user['user_control']==2){
      this.menuItems = ROUTES2.filter(menuItem => menuItem);
    }
    if(this.user.user_control==2)
    {
        this.oprator=false;
    }
    else
    {
      this.oprator=true;
    }
      //   this.menuItems.push({ path: '/furnace', title: 'Furnace Dashboard',  icon: 'ni-tv-2 text-primary', class: '' })
      //   this.menuItems.push({ path: '/meterhistory', title: 'Meter History',  icon: 'ni-bullet-list-67 text-red', class: '' })
      // if(this.user['user_control']==1)
      // {
        
      // }
     // console.log(this.menuItems);
    // } );//   this.menuItems.push(
      //     { path: '/batch', title: 'Batch Master',  icon: 'ni-bullet-list-67 text-red', class: '' }
      //   )
      // }
      // else if(this.user['user_control']==0)
      // {
      //   this.menuItems.push(
      //     { path: '/machine', title: 'Machine Master',  icon: 'ni-bullet-list-67 text-red', class: '' },
      //     { path: '/tags', title: 'Tag Master',  icon: 'ni-bullet-list-67 text-red', class: '' },
      //     { path: '/batch', title: 'Batch Master',  icon: 'ni-bullet-list-67 text-red', class: '' }
      // 
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  // console.log(this.user);
   
  }
}
