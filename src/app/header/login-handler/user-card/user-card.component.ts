/*********************************************************** 
* Copyright (C) 2022 
* Worktez 
* 
* This program is free software; you can redistribute it and/or 
* modify it under the terms of the MIT License 
* 
* 
* This program is distributed in the hope that it will be useful, 
* but WITHOUT ANY WARRANTY; without even the implied warranty of 
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. 
* See the MIT License for more details. 
***********************************************************/
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserAppSetting } from 'src/app/Interface/UserInterface';
import { AuthService } from 'src/app/services/auth.service';
import { StartServiceService } from 'src/app/services/start/start-service.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input('user') user: User
  showCard: boolean = false
  constructor(private startService: StartServiceService, public authService: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.readProfileDetails();
  }

  readProfileDetails(){
    console.log("1",this.user.photoURL)
    // const data = this.userService.getUserData(this.user.email);
    // console.log("111",data)

    // if(data != undefined) {
    //   this.photoUrl = data.photoURL;
    //   console.log("hereee:",this.photoUrl)
    // }
  }
   

  toogleCard() {
    this.showCard = !this.showCard
  }
  onLogout() {
    this.authService.logout().then(()=>{
      this.startService.stopApplication();
      this.router.navigate(['/']);
    });
  }
  profile() {
    this.router.navigate(['/profile', this.authService.userAppSetting.Username]);
  }
}
