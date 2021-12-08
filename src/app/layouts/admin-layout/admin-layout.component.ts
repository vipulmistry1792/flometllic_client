import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AccountService } from '../../_services';
import { User } from '../../_models';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  public location: Location;
  public oprator;
  user: User;
  constructor(location: Location,private accountService: AccountService) {
    this.location = location;
    this.accountService.user.subscribe(x => this.user = x);
   }
   ngOnInit() {
    if(this.user.user_control==2)
    {
        this.oprator=false;
    }
    else
    {
      this.oprator=true;
    }   
  }

}
